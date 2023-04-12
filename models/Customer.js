import {Person} from './Person.js'
export class Customer extends Person {
    constructor() {
      super(fullName, address, id, email);
      this.type = 'customer';
      this.companyName = companyName;
      this.invoiceValue = invoiceValue;
      this.rating = rating;
    }
  }