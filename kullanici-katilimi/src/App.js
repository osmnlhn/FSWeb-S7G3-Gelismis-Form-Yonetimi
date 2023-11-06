import { useState } from 'react';
import './App.css';
import Form from "./Form";
import Users from './Users';

function App() {
  const [users, setUsers] = useState([]);
  return (
    <div className="App-Header">
      <Form users={users} setUsers={setUsers} />
      <Users users={users} />
    </div>
  );
}

export default App;
