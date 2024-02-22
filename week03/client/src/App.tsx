import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

import "./App.css";
const GET_PERSONS = gql`
  query persons {
    persons {
      id
      name
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_PERSONS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <>
      <div>
        {data.persons.map((person: any) => (
          <Link key={person.id} to={`person/${person.id}`}>
            <h2>{person.name}</h2>
          </Link>
        ))}
      </div>
    </>
  );
}

export default App;
