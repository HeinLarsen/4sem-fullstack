import { gql } from "@apollo/client";
export const ADD_PERSON = gql`
  mutation ADD_PERSON(
    $name: String!
    $age: Int!
    $phoneNumber: String!
    $addressID: ID!
  ) {
    addPerson(
      name: $name
      age: $age
      phoneNumber: $phoneNumber
      addressID: $addressID
    ) {
      id
      name
    }
  }
`;

export const ADD_ADDRESS = gql`
  mutation ADD_ADDRESS(
    $street: String!
    $city: String!
    $state: String!
    $zip: String!
  ) {
    addAddress(street: $street, city: $city, state: $state, zip: $zip) {
      id
      street
    }
  }
`;
