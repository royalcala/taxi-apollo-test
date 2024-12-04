import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_CREDENTIAL_TYPES = gql`
  query GetCredentialTypes {
    credentialTypes {
      id
      name
      degreeOfferings {
        id
        name
      }
    }
  }
`;

const CREATE_CREDENTIAL_TYPE = gql`
  mutation CreateCredentialType($name: String!) {
    createCredentialType(name: $name) {
      id
      name
    }
  }
`;

const CredentialTypes = () => {
  const { loading, error, data } = useQuery(GET_CREDENTIAL_TYPES);
  const [createCredentialType] = useMutation(CREATE_CREDENTIAL_TYPE);
  const [name, setName] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    createCredentialType({ variables: { name }, refetchQueries: [{ query: GET_CREDENTIAL_TYPES }] });
    // setName('');
  };

  return (
    <div>
      <h1>Credential Types</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New Credential Type" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {data.credentialTypes.map(ct => (
          <li key={ct.id}>
            {ct.name}
            <ul>
              {ct.degreeOfferings.map(degreeOffering => (
                <li key={degreeOffering.id}>
                  <Link to={`/degree-offerings/${degreeOffering.id}`}>{degreeOffering.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CredentialTypes;