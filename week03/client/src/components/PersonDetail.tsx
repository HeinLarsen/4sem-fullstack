import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
const GET_PERSON = gql`
  query person($personId: ID) {
    person(id: $personId) {
      id
      name
      age
      phoneNumber
      address {
        id
        street
        city
        state
        zip
      }
    }
  }
`;
function PersonDetail() {
  const { personId } = useParams();

  const { loading, error, data } = useQuery(GET_PERSON, {
    variables: { personId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <>
      <h2>{data.person.name}</h2>
      <p>Age: {data.person.age}</p>
      <p>Phone: {data.person.phoneNumber}</p>
      <p>
        Address: {data.person.address.street}, {data.person.address.city},{" "}
        {data.person.address.state}, {data.person.address.zip}
      </p>
    </>
  );
}

export default PersonDetail;
