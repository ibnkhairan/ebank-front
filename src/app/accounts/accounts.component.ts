import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {catchError, Observable, throwError} from "rxjs";
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
  operationsFormGroup! : FormGroup;
  errorMessage! : string;

  constructor(private formBuilder : FormBuilder,private accountService : AccountsService) {
  }

  ngOnInit(): void {
    this.accountFormGroup = this.formBuilder.group({
      accountId : this.formBuilder.control("")
    });

    this.operationsFormGroup = this.formBuilder.group({
      operationType : this.formBuilder.control(null),
      amount : this.formBuilder.control(0),
      description : this.formBuilder.control(null),
      accountDestination : this.formBuilder.control(null)
    });
  }


  handleSearchAccount() {

    let accountId : string = this.accountFormGroup.value.accountId;
    console.log(accountId);
    this.accountObservable = this.accountService.getAccount(accountId,this.currentPage,this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  gotoPage( page : number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {

    let accountId :string = this.accountFormGroup.value.accountId;
    let operationType=this.operationsFormGroup.value.operationType;
    let amount :number =this.operationsFormGroup.value.amount;
    let description :string =this.operationsFormGroup.value.description;
    let accountDestination :string =this.operationsFormGroup.value.accountDestination;


    if(operationType == 'DEBIT'){
        this.accountService.debit(accountId,amount,description).subscribe({
          next : (data)=>{
            alert("Success Debit");
            this.operationsFormGroup.reset();
            this.handleSearchAccount();
          },error : err => {
            console.log(err);
          }
        });
    }else if(operationType == 'CREDIT'){
      this.accountService.credit(accountId,amount,description).subscribe({
        next : (data)=>{
          alert("Success Credit");
          this.operationsFormGroup.reset();
          this.handleSearchAccount();
        },error : err => {
          console.log(err);
        }
      });

    }else if(operationType == 'TRANSFERT'){

      this.accountService.transfert(accountId,accountDestination, amount,description).subscribe({
        next : (data)=>{
          alert("Success Transfert");
          this.operationsFormGroup.reset();
          this.handleSearchAccount();
        },
        error : (err)=>{
          console.log(err);
        }
      });
    }


  }
}
