import {Person} from './Person.js';
export class Employee extends Person {
  constructor() {
    super(fullName,address,id,email);
    this.type = 'employee';
    this.daysOfWork = daysOfWork;
    this.dailySalary = dailySalary;
  }
  calculateSalary() {
    return this.daysOfWork * this.dailySalary;
  }
}


