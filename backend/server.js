const { ApolloServer, gql } = require('apollo-server');

// Define the schema
const typeDefs = gql`
  type Query {
    credentialTypes: [CredentialType]
    degreeOfferings(credentialTypeId: ID!): [DegreeOffering]
    forms(degreeOfferingId: ID!): [Form]
  }

  type Mutation {
    createCredentialType(name: String!): CredentialType
    createDegreeOffering(credentialTypeId: ID!, name: String!): DegreeOffering
    createForm(degreeOfferingId: ID!, name: String!): Form
    updateForm(formId: ID!, name: String): Form
  }

  type CredentialType {
    id: ID!
    name: String!
    degreeOfferings: [DegreeOffering]
  }

  type DegreeOffering {
    id: ID!
    name: String!
    forms: [Form]
  }

  type Form {
    id: ID!
    name: String!
  }
`;

// Initial seed data
let credentialTypes = [
  { id: '1', name: 'Bootcamp' },
  { id: '2', name: 'Degree' },
  { id: '3', name: 'Short Course' },
  { id: '4', name: 'Graduate Certificate' }
];

let degreeOfferings = [
  { id: '1', credentialTypeId: '1', name: 'alb-umt' },
  { id: '2', credentialTypeId: '1', name: 'alb-bio' },
  { id: '3', credentialTypeId: '2', name: 'alb-bio' }
];

let forms = [
  { id: '1', degreeOfferingId: '1', name: 'Form 1' },
  { id: '2', degreeOfferingId: '2', name: 'Form 2' },
  { id: '3', degreeOfferingId: '3', name: 'Form 3' }
];

const resolvers = {
  Query: {
    credentialTypes: () => credentialTypes,
    degreeOfferings: (_, { credentialTypeId }) => degreeOfferings.filter(d => d.credentialTypeId === credentialTypeId),
    forms: (_, { degreeOfferingId }) => forms.filter(f => f.degreeOfferingId === degreeOfferingId),
  },
  Mutation: {
    createCredentialType: (_, { name }) => {
      const newCredentialType = { id: `${credentialTypes.length + 1}`, name };
      credentialTypes.push(newCredentialType);
      return newCredentialType;
    },
    createDegreeOffering: (_, { credentialTypeId, name }) => {
      const newDegreeOffering = { id: `${degreeOfferings.length + 1}`, credentialTypeId, name };
      degreeOfferings.push(newDegreeOffering);
      return newDegreeOffering;
    },
    createForm: (_, { degreeOfferingId, name }) => {
      const newForm = { id: `${forms.length + 1}`, degreeOfferingId, name };
      forms.push(newForm);
      return newForm;
    },
    updateForm: (_, { formId, name }) => {
      const form = forms.find(f => f.id === formId);
      if (form) {
        form.name = name || form.name;
      }
      return form;
    },
  },
  CredentialType: {
    degreeOfferings: (parent) => degreeOfferings.filter(d => d.credentialTypeId === parent.id),
  },
  DegreeOffering: {
    forms: (parent) => forms.filter(f => f.degreeOfferingId === parent.id),
  },
};

// Create the Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});