import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{

  customers! : Observable<Array<Customer>>;
  //errorMessage! : string | undefined;
  errorMessage! : string;
  searchFormGroup : FormGroup | undefined;

  constructor(private customerService : CustomerService,private formBuilder : FormBuilder, private router : Router) {
  }

  ngOnInit(): void {
    this.searchFormGroup=this.formBuilder.group({
      keyword : this.formBuilder.control("")
    });

   this.handleSearchCustomers();
  }

  handleSearchCustomers() {
    let kw = this.searchFormGroup?.value.keyword;
    this.customers =  this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );

  }

  handleDeleteCustomer(customer : Customer) {
    let conf = confirm("Are you sure ?");
    if(!conf) return;

    this.customerService.deleteCustomer(customer.id).subscribe({
      next : (resp)=>{
          this.customers = this.customers.pipe(
            map(data =>{
              let index = data.indexOf(customer);
              data.slice(index,1);
              return data;
            })
          );
      },error: err => {
            console.log(err);
      }
    });
  }

  handleCustomerAccounts(customer : Customer) {
    this.router.navigateByUrl(`/customer-accounts/${customer.id}`,{state : customer});
  }
}
