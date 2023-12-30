
import {Customer} from "./customer.model";

export interface CustomerBankAccount {
  id:            string;
  type:          string;
  balance:       number;
  createdAt:     Date;
  status:        null | string;
  customerDTO:   Customer;
  overDraft?:    number;
  interestRate?: number;
}
