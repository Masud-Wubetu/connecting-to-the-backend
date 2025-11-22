import { useEffect, useState } from 'react';
import {CanceledError} from './services/api-client'
import userService, { User } from './services/user-service';
import useUsers from './services/hooks/useUsers';




function App() {
    const { users, error, isLoading, setUsers, setError } = useUsers();

    const deleteUser = (user: User) => {
     const originalUsers = [...users];
     setUsers(users.filter(u => u.id !== user.id));

     userService.delete(user.id)
     .catch(err => {
         setError(err.message);
         setUsers(originalUsers);
       });
  }

   const addUser = () => {
    const originalUsers = [...users];
    const newUser = {id: 0, name: "Masud Wubetu"};
    setUsers([...users, newUser]);
 
    userService.add(newUser)
     .then(res => setUsers([res.data, ...users]))
     .catch(err => {
      setError(err.message);
      setUsers(originalUsers);
     })
  }

   const updatedUser = (user: User) => {
    const originalUsers = [...users] 
    const updatedUser = {...user, name: user.name + '!'};
    setUsers(users.map(u => u.id === user.id ? updatedUser : u));

   userService.update(updatedUser) 
      .catch(err => {
        setError(err.message);
        setUsers(originalUsers);
      })
  }

  return (
    <>
      { isLoading && <div className="spinner-border"></div>}
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-primary mb-3" onClick={addUser}>Add</button>
      <ul className="list-group">
        {users.map(user =>
        <li key={user.id} className="list-group-item d-flex justify-content-between">
          {user.name}
          <div>
            <button className="btn btn-secondary mx-1" onClick={() => updatedUser(user)}>Update</button>
            <button className="btn btn-outline-danger" onClick={() => deleteUser(user)}>Delete</button>
          </div>
        </li>)}
 
      </ul>
   </>
  );
}

export default App;
