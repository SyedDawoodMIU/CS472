"use strict";

import { Person } from "./person.js";

export class Employee extends Person {
  constructor(name, dateOfBirth, salary, hireDate) {
    super(name, dateOfBirth);
    this.sal = salary;
    this.hDate = hireDate;
  }

  get salary() {
    return this.sal;
  }

  set salary(salary) {
    this.sal = salary;
  }

  get hireDate() {
    return this.hDate;
  }

  set hireDate(hireDate) {
    this.hDate = hireDate;
  }

  doJob(jobTitle) {
    console.log(
      `${this.name} is a ${jobTitle} who earns $${this.salary.toFixed(2)}`
    );
  }
}
