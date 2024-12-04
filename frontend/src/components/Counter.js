import React from 'react';
import { useQuery, gql, useReactiveVar } from '@apollo/client';
import { counterVar } from '../index';

const GET_COUNTER = gql`
  query GetCounter {
    counter @client
  }
`;

const Counter = () => {
  const { data } = useQuery(GET_COUNTER);
  const counter = useReactiveVar(counterVar);

  return (
    <div>
      <h2>Counter: {data.counter}</h2>
      <button onClick={() => counterVar(counter + 1)}>Increment</button>
      <button onClick={() => counterVar(counter - 1)}>Decrement</button>
    </div>
  );
};

export default Counter;