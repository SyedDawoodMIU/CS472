"use strict";

export class Person {
  constructor(name, dateOfBirth) {
    this.fullName = name;
    this.dob = dateOfBirth;
  }

  get name() {
    return this.fullName;
  }

  set name(name) {
    this.fullName = name;
  }

  get dateOfBirth() {
    return this.dob;
  }

  set dateOfBirth(dateOfBirth) {
    this.dob = dateOfBirth;
  }

  toString() {
    return `{ Name: ${this.name}, DateOfBirth: ${this.dateOfBirth
      .toISOString()
      .substring(0, 10)} }`;
  }
}
