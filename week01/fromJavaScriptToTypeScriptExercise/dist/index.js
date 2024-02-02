"use strict";
exports.__esModule = true;
var person_1 = require("../src/person");
var people = [
    new person_1.Person("Steve", 25, person_1.Gender.MALE),
    new person_1.Person("Michell", 19, person_1.Gender.FEMALE),
    new person_1.Person("Patrick", 17, person_1.Gender.MALE),
    new person_1.Person("Claus", 55, person_1.Gender.MALE),
    new person_1.Person("Benjamin", 12, person_1.Gender.MALE),
    new person_1.Person("Laura", 33, person_1.Gender.FEMALE),
    new person_1.Person("Isabella", 12, person_1.Gender.FEMALE),
    new person_1.Person("Emily", 15, person_1.Gender.FEMALE),
    new person_1.Person("Jonathan", 13, person_1.Gender.MALE),
];
var table = document.getElementById("table"); // missing html element
var header = document.getElementById("header");
var button = document.getElementById("button");
var btn = document.createElement("button");
btn.innerHTML = "Sort";
button === null || button === void 0 ? void 0 : button.appendChild(btn);
var helloWorld = function (name) {
    return "Hello from ".concat(name);
};
if (header) {
    header.innerHTML = helloWorld("TypeScript");
}
var createTable = function (array) {
    array.forEach(function (person) {
        var row = document.createElement("tr"); // missing html element
        row.innerHTML = "\n        <td>".concat(person.getName(), "</td>\n        <td>").concat(person.getAge(), "</td>\n        <td>").concat(person.getGender(), "</td>\n    ");
        table.appendChild(row);
    });
};
createTable(people);
var toggle = false;
btn.addEventListener("click", function () {
    if (toggle && table) {
        table.innerHTML = "";
        createTable(sortPeopleAscending(people));
        toggle = !toggle;
    }
    else {
        table.innerHTML = "";
        createTable(sortPeopleDescending(people));
        toggle = !toggle;
    }
});
var sortPeopleDescending = function (array) {
    return array.sort(function (a, b) {
        if (a.getName() < b.getName()) {
            return -1;
        }
        if (a.getName() > b.getName()) {
            return 1;
        }
        return 0;
    });
};
var sortPeopleAscending = function (array) {
    return array.sort(function (a, b) {
        if (a.getName() < b.getName()) {
            return 1;
        }
        if (a.getName() > b.getName()) {
            return -1;
        }
        return 0;
    });
};
