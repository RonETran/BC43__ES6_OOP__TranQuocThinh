import {Person} from './Person.js';
export class Student extends Person {
    constructor() {
      super(fullName, address, id, email);
      this.type = 'student';
      this.math = math;
      this.physics = physics;
      this.chemistry = chemistry;
    }
  
    calculateAverage() {
      return (Number(this.math) + Number(this.physics) + Number(this.chemistry)) / 3;
    }
  }
