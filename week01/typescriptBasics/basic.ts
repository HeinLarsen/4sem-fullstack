// Basic Types
let num: number = 10;
let str: string = "Hello";
let bool: boolean = true;
let arr: number[] = [1, 2, 3];
let anyVar: any = "Anything";

// Enums
enum Days {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

enum DaysToString {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

// Similar to enum: Readonly object
const DaysObj = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
} as const;

// Classes
class Person {
  private _name: string;
  private _email: string;
  private _age: number;

  constructor(name: string, email: string, age: number) {
    this._name = name;
    this._email = email;
    this._age = age;
  }

  getName(): string {
    return this._name;
  }

  setName(name: string) {
    this._name = name;
  }

  getEmail(): string {
    return this._email;
  }

  getAge(): number {
    return this._age;
  }

  setge(age: number) {
    this._age = age;
  }
}

const person = new Person("John Doe", "john@example.com", 30);

class Employee extends Person {
  private _salary: number;

  constructor(name: string, email: string, age: number, salary: number) {
    super(name, email, age);
    this._salary = salary;
  }
}

const employee = new Employee("Jane Doe", "jane@example.com", 25, 50000);

// Type Assertion
let anyVariable: any = "Hello";
let strVariable: string = anyVariable as string;

// Function with Types
function addNumbers(x: number, y: number): number {
  return x + y;
}

// Tuples
const status200: [number, string] = [200, "OK"];
const status400: [number, string] = [400, "Bad Request"];
const status404: [number, string] = [404, "Not Found"];
const status500: [number, string] = [500, "Internal Server Error"];

const personTuple: [string, number, string] = [
  "John Doe",
  30,
  "john@example.com",
];

// Union Types
function numberOrString(param: number | string): void {
  console.log(param);
}

type PersonTuple = [string, number | string, string];
const personInfo: PersonTuple = ["John Doe", 30, "john@example.com"];

// Generics
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

function combineObjects<T extends object, U extends object>(
  obj1: T,
  obj2: U
): T & U {
  return { ...obj1, ...obj2 };
}

// Array Types
const numbersArray: Array<number> = [1, 2, 3];
const ticTacToeBoard: string[][] = [
  ["-", "-", "-"],
  ["-", "-", "-"],
  ["-", "-", "-"],
];

// Exclamation Mark
let nullableValue: string | null | undefined = "Hello";
let nonNullableValue: string = nullableValue!;

let myString: string | undefined = "str"; // possibleUndefinedStringFunction();
let lemgth: number = myString!.length;

// Question mark
function printName(name?: string) {
  console.log(name);
}

interface IPerson {
  name: string;
  age?: number;
}

const personWithAge: IPerson = { name: "John", age: 30 };
const personWithoutAge: IPerson = { name: "Jane" };

// Unions - Narrowing the Type
function processStringOrNumber(input: string | number): string | number {
  return typeof input === "string" ? input : input * 2;
}

// Type Assertion
anyVar = document.getElementById("myDiv");
let inputElement: HTMLInputElement = anyVar as HTMLInputElement;

// Literal Types combined with Union Types
function getDirectionNumber(
  direction: "left" | "right" | "up" | "down"
): number {
  switch (direction) {
    case "left":
      return 1;
    case "right":
      return 2;
    case "up":
      return 3;
    case "down":
      return 4;
    default:
      throw new Error("Invalid direction");
  }
}

// in Operator Narrowing
type Human = {
  eat(): void;
};

type Alien = {
  fly(): void;
};

interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function processCreature(creature: Human | Alien): void {
  if ("eat" in creature) {
    creature.eat();
  } else {
    creature.fly();
  }
}

// instanceof Operator Narrowing
const personObj = { name: "John" };
const carObj = { model: "Toyota" };

function getNameOrModel(obj: any): string {
  if (obj instanceof Object) {
    return obj.name || obj.model || "";
  }
  return "";
}

// Type Predicates
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

// Index Signatures
interface IPerson {
  name: string;
  [key: string]: any;
}

const myPerson: IPerson = {
  name: "John",
  age: 30,
};

// Intersection Types
interface Person {
  name: string;
}

interface Student {
  studentId: number;
}

function mergePersonAndStudent(
  person: Person,
  student: Student
): Person & Student {
  return { ...person, ...student } as Person & Student;
}
