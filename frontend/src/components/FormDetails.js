import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_FORMS = gql`
  query GetForms($degreeOfferingId: ID!) {
    forms(degreeOfferingId: $degreeOfferingId) {
      id
      name
    }
  }
`;

const UPDATE_FORM = gql`
  mutation UpdateForm($formId: ID!, $name: String) {
    updateForm(formId: $formId, name: $name) {
      id
      name
    }
  }
`;

const FormDetails = () => {
  const { degreeOfferingId } = useParams();
  const { loading, error, data } = useQuery(GET_FORMS, {
    variables: { degreeOfferingId }
  });
  const [updateForm] = useMutation(UPDATE_FORM);
  const [name, setName] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateForm({ variables: { formId: data.forms[0].id, name }, refetchQueries: [{ query: GET_FORMS, variables: { degreeOfferingId } }] });
    setName('');
  };

  return (
    <div>
      <h1>Form Details</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Update Form Name" />
        <button type="submit">Update</button>
      </form>
      <ul>
        {data.forms.map(form => (
          <li key={form.id}>{form.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FormDetails;