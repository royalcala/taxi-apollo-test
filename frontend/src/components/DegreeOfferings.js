import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const GET_DEGREE_OFFERINGS = gql`
  query GetDegreeOfferings($credentialTypeId: ID!) {
    degreeOfferings(credentialTypeId: $credentialTypeId) {
      id
      name
      forms {
        id
        name
      }
    }
  }
`;

const DegreeOfferings = () => {
  const { credentialTypeId } = useParams();
  const { loading, error, data } = useQuery(GET_DEGREE_OFFERINGS, {
    variables: { credentialTypeId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Degree Offerings</h1>
      <ul>
        {data.degreeOfferings.map(degreeOffering => (
          <li key={degreeOffering.id}>
            {degreeOffering.name}
            <ul>
              {degreeOffering.forms.map(form => (
                <li key={form.id}>
                  <Link to={`/forms/${form.id}`}>{form.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DegreeOfferings;