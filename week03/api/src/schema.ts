const typeDefs = `#graphql 
  type Query {
    person(id: ID): Person
    persons: [Person]
    address(id: ID): Address
    addresses: [Address]
    addressesByZip(zip: String!): [Address]
    personByPhoneNumber(phoneNumber: String!): Person
  }

  type Mutation {
    addPerson(name: String!, age: Int!, phoneNumber: String!, addressID: ID!): Person
    addAddress(street: String!, city: String!, state: String!, zip: String!): Address
    addPersonToAddress(personID: ID!, addressID: ID!): Address
    removePersonFromAddress(personID: ID!, addressID: ID!): Address
    deletePerson(id: ID!): String
  }

  type Person {
    id: ID!
    name: String!
    age: Int!
    phoneNumber: String!
    address: Address!
  }

  type Address {
    id: ID!
    street: String!
    city: String!
    state: String!
    zip: String!
    persons: [Person]
  }

`;

const persons = [
  {
    id: "1",
    name: "John Doe",
    age: 22,
    phoneNumber: "123-456-7890",
    address: {
      id: "1",
      street: "123 Fake St",
      city: "Faketown",
      state: "FK",
      zip: "12345",
    },
  },
  {
    id: "2",
    name: "Jane Doe",
    age: 23,
    phoneNumber: "123-456-7890",
    address: {
      id: "1",
      street: "123 Fake St",
      city: "Faketown",
      state: "FK",
      zip: "12345",
    },
  },
  {
    id: "3",
    name: "John Smith",
    age: 24,
    phoneNumber: "123-456-7890",
    address: {
      id: "1",
      street: "123 Fake St",
      city: "Faketown",
      state: "FK",
      zip: "12345",
    },
  },
  {
    id: "4",
    name: "Jane Smith",
    age: 25,
    phoneNumber: "123-456-7890",
    address: {
      id: "2",
      street: "124 Fake St",
      city: "Faketown",
      state: "FK",
      zip: "12345",
    },
  },
];

const addresses = [
  {
    id: "1",
    street: "123 Fake St",
    city: "Faketown",
    state: "FK",
    zip: "12345",
    persons: [
      {
        id: "1",
        name: "John Doe",
        age: 22,
        phoneNumber: "123-456-7890",
      },
      {
        id: "2",
        name: "Jane Doe",
        age: 23,
        phoneNumber: "123-456-7890",
      },
      {
        id: "3",
        name: "John Smith",
        age: 24,
        phoneNumber: "123-456-7890",
      },
    ],
  },
  {
    id: "2",
    street: "124 Fake St",
    city: "Faketown",
    state: "FK",
    zip: "12345",
    persons: [
      {
        id: "4",
        name: "Jane Smith",
        age: 25,
        phoneNumber: "123-456-7890",
      },
    ],
  },
];

type Person = {
  id: string;
  name: string;
  age: number;
  phoneNumber: string;
  address: Address;
};

type Address = {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  persons: Person[];
};

type AddressPerson = {
  personID: string;
  addressID: string;
};

const resolvers = {
  Query: {
    person: (parent: never, args: Person, context: never, info: never) => {
      return persons.find((person) => person.id === args.id);
    },
    persons: (parent: never, args: never, context: never, info: never) => {
      return persons;
    },
    address: (parent: never, args: Address, context: never, info: never) => {
      return addresses.find((address) => address.id === args.id);
    },
    addresses: (parent: never, args: unknown, context: never, info: never) => {
      return addresses;
    },
    addressesByZip: (
      parent: never,
      args: Address,
      context: never,
      info: never
    ) => {
      return addresses.filter((address) => address.zip === args.zip);
    },
    personByPhoneNumber: (
      parent: never,
      args: Person,
      context: never,
      info: never
    ) => {
      return persons.find((person) => person.phoneNumber === args.phoneNumber);
    },
  },
  Mutation: {
    addPerson: (
      parent: never,
      args: {
        name: string;
        age: number;
        phoneNumber: string;
        addressID: string;
      },
      context: never,
      info: never
    ) => {
      const address = addresses.find(
        (address) => address.id === args.addressID
      );
      if (!address) {
        throw new Error("Address not found");
      }
      const newPerson = {
        id: String(persons.length + 1),
        name: args.name,
        age: args.age,
        phoneNumber: args.phoneNumber,
        address: address,
      };
      persons.push(newPerson);
      return newPerson;
    },
    addAddress: (parent: never, args: Address, context: never, info: never) => {
      const newAddress = {
        id: String(addresses.length + 1),
        street: args.street,
        city: args.city,
        state: args.state,
        zip: args.zip,
        persons: [],
      };
      addresses.push(newAddress);
      return newAddress;
    },
    addPersonToAddress: (
      parent: never,
      { personID, addressID }: AddressPerson,
      context: never,
      info: never
    ) => {
      const person = persons.find((person) => person.id === personID);
      const address = addresses.find((address) => address.id === addressID);
      if (!person || !address) {
        throw new Error("Person or Address not found");
      }
      address.persons.push(person);
      return address;
    },
    removePersonFromAddress: (
      parent: never,
      args: AddressPerson,
      context: never,
      info: never
    ) => {
      const address = addresses.find(
        (address) => address.id === args.addressID
      );
      if (!address) {
        throw new Error("Address not found");
      }
      address.persons = address.persons.filter(
        (person) => person.id !== args.personID
      );
      return address;
    },
    deletePerson: (
      parent: never,
      { id }: Person,
      context: never,
      info: never
    ) => {
      const index = persons.findIndex((person) => person.id === id);
      if (index === -1) {
        throw new Error("Person not found");
      }
      persons.splice(index, 1);
      return "Person deleted successfully";
    },
  },
};

export { typeDefs, resolvers };
