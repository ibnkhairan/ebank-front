import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{

  accountFormGroup! : FormGroup;
  currentPage : number = 0;
  pageSize : number = 5;
  accountObservable! : Observable<AccountDetails>;

  constructor(private formBuilder : FormBuilder,private accountService : AccountsService) {
  }

  ngOnInit(): void {
    this.accountFormGroup = this.formBuilder.group({
      accountId : this.formBuilder.control("")
    });
  }


  handleSearchAccount() {

    let accountId : string = this.accountFormGroup.value.accountId;
    console.log(accountId);
    this.accountObservable = this.accountService.getAccount(accountId,this.currentPage,this.pageSize);
  }

  gotoPage( page : number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }
}
