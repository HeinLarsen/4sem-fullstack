import axios from "axios";

const getUser = async () => {
  try {
    const response = await axios.get<User>(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

try {
  axios.get("https://jsonplaceholder.typicode.com/users/1");
} catch (error) {
  console.error(error);
}

const getUsers = async () => {
  try {
    const response = await axios.get<User[]>(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

function printUserInformation(user: User) {
  console.log(`Name: ${user.name}`);
  console.log(`Username: ${user.username}`);
  console.log(`Email: ${user.email}`);
  console.log(`Phone: ${user.phone}`);
  console.log(`Website: ${user.website}`);
  console.log(`Company: ${user.company.name}`);
}

let user = await getUser();
if (user) {
  printUserInformation(user);
}

// 1 On DefinitelyTyped.
// 2 @types/axios.
// 3 Search for the library on DefinitelyTyped.
// 4 A type declaration file is a file that contains type information for a module that is written in JavaScript. A type definition file is a file that contains type information for a module that is written in TypeScript.
