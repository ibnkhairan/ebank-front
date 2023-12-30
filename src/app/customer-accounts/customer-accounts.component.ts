import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer.model";
import {FormBuilder} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {CustomerBankAccount} from "../model/customer-account";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit{
  customerId! : number;
  customer! : Customer;
  customerAccounts! : Array<CustomerBankAccount>;

  constructor(private route : ActivatedRoute,private router : Router,private formBuilder : FormBuilder,
                private accountService : AccountsService) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.getCustomerAccounts(this.customerId);
  }

  private getCustomerAccounts(customerId: number) {
    this.accountService.getCustomerAccounts(customerId).subscribe({
        next : (resp)=>{
              this.customerAccounts = resp;
        },error : err => {
          console.log(err);
      }
    });
  }



}
