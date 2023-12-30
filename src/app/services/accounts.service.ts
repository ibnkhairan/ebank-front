import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";
import {CustomerBankAccount} from "../model/customer-account";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http : HttpClient) { }

  public getAccount(accountId : string, page : number, size : number):Observable<AccountDetails> {
    return this.http.get<AccountDetails>(`${environment.backendHost}/accounts/${accountId}/pageOperations?page=${page}&size=${size}`);
  }
    public debit(accountId : string, amount : number, description : string){

    let data ={accountId:accountId,amount:amount,description:description};
      return this.http.post(`${environment.backendHost}/accounts/debit`,data);

    }

  public credit(accountId : string, amount : number, description : string){

    let data ={accountId:accountId,amount:amount,description:description};
    return this.http.post(`${environment.backendHost}/accounts/credit`,data);

  }

  public transfert(accountSource : string,accountDestination : string, amount : number, description : string){

    let data ={accountSource,accountDestination,amount,description};
    console.log(`${environment.backendHost}/accounts/transfert`);
    return this.http.post(`${environment.backendHost}/accounts/transfert`,data);

  }

  public getCustomerAccounts(customerId : number):Observable<Array<CustomerBankAccount>>{
    return this.http.get<Array<CustomerBankAccount>>(`${environment.backendHost}/customer-accounts/${customerId}`);
  }


}
