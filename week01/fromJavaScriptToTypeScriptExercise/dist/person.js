"use strict";
exports.__esModule = true;
exports.Person = exports.Gender = void 0;
var Person = /** @class */ (function () {
    function Person(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    Person.prototype.getName = function () {
        return this.name;
    };
    Person.prototype.getAge = function () {
        return this.age;
    };
    Person.prototype.getGender = function () {
        return this.gender;
    };
    return Person;
}());
exports.Person = Person;
var Gender;
(function (Gender) {
    Gender["MALE"] = "Male";
    Gender["FEMALE"] = "Female";
})(Gender || (Gender = {}));
exports.Gender = Gender;
