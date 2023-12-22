import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{

  customers! : Observable<any>;
  errorMessage! : object;
 // errorMessage : string | undefined;

  constructor(private customerService : CustomerService) {
  }

  ngOnInit(): void {
   /*   this.customerService.getCustomers().subscribe({
        next : data=>{
          this.customers = data;
        },error : err=>{
          this.errorMessage=err.message;
        }

      });*/

    this.customers = this.customerService.getCustomers();
  }

}
