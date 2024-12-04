import React from 'react';
import { Outlet } from 'react-router-dom';
import Counter from './components/Counter';

const App = () => {
  return (
    <div>
      <h1>University Marketing Forms</h1>
      <Counter />
      <Outlet />
    </div>
  );
};

export default App;