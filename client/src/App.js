import React, { useState } from "react";
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';

function App() {
  const [token, setToken] = useState();

  console.log(token);
  if (token == undefined || token == "" || token == null) {
    return <Login setToken={setToken} />
  }

  return (
    <>
      <Dashboard />
    </>
  );
}

export default App;
