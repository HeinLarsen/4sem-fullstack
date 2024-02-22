import { useQuery, gql } from "@apollo/client";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PERSON } from "../mutations/mutations";
const GET_ADDRESSES = gql`
  query addresses {
    addresses {
      id
      street
      city
      state
      zip
    }
  }
`;

function PersonAdd() {
  const { loading, error, data } = useQuery(GET_ADDRESSES);
  const [person, setPerson] = useState({
    name: "",
    age: 0,
    phoneNumber: "",
    addressID: "",
  });

  const [addPerson] = useMutation(ADD_PERSON);

  const handleAddPerson = () => {
    addPerson({
      variables: {
        name: person.name,
        age: person.age,
        phoneNumber: person.phoneNumber,
        addressID: person.addressID,
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={person.name}
          onChange={(e) => setPerson({ ...person, name: e.target.value })}
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          value={person.age}
          onChange={(e) =>
            setPerson({ ...person, age: parseInt(e.target.value) })
          }
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          value={person.phoneNumber}
          onChange={(e) =>
            setPerson({ ...person, phoneNumber: e.target.value })
          }
        />
      </div>
      <div>
        <label>Address:</label>
        <select
          value={person.addressID}
          onChange={(e) => setPerson({ ...person, addressID: e.target.value })}
        >
          <option value="" disabled>
            Select an address
          </option>

          {data.addresses.map((address: any) => (
            <option key={address.id} value={address.id}>
              {address.street}, {address.city}, {address.state}, {address.zip}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAddPerson}>Add Person</button>
    </>
  );
}

export default PersonAdd;
