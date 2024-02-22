import { useQuery, gql } from "@apollo/client";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ADDRESS } from "../mutations/mutations";

function AddressAdd() {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const [addAddress] = useMutation(ADD_ADDRESS);

  const handleAddAddress = () => {
    addAddress({
      variables: {
        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
      },
    });
  };

  return (
    <>
      <div>
        <label>Street:</label>
        <input
          type="text"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
        />
      </div>
      <div>
        <label>State:</label>
        <input
          type="text"
          value={address.state}
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
        />
      </div>
      <div>
        <label>Zip:</label>
        <input
          type="text"
          value={address.zip}
          onChange={(e) => setAddress({ ...address, zip: e.target.value })}
        />
      </div>
      <button onClick={handleAddAddress}>Add Address</button>
    </>
  );
}

export default AddressAdd;
