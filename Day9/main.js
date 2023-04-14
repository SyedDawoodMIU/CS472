"use strict";

import { Person } from "./person.js";
import { Employee } from "./employee.js";

let persons = [
  new Person("Ana Smith", new Date("1998-12-15")),
  new Person("Bob Jone", new Date("1945-11-16")),
  new Person("Carlos Slim Helu", new Date("1976-09-24")),
];

for (let person of persons) {
  console.log(person.toString());
}

let jimHanson = new Employee(
  "Jim Hanson",
  new Date("1999-01-01"),
  245990.0,
  new Date("2020-01-01")
);


jimHanson.doJob("Software Engineer");
