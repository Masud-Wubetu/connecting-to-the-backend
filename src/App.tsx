import axios, { CanceledError } from 'axios';
import { useEffect, useState } from 'react';


interface User{
  id: number,
  name: string,
}


function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    axios
     .get<User[]>('https://jsonplaceholder.typicode.com/users', {signal: controller.signal})
     .then(res => {
      setUsers(res.data);
      setLoading(false);
     })
     .catch(err => {
        if(err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [])

  const deleteUser = (user: User) => {
     const originalUsers = [...users];
     setUsers(users.filter(u => u.id !== user.id));


     axios.delete('https://jsonplaceholder.typicode.com/users/' + user.id)
       .catch(err => {
         setError(err.message);
         setUsers(originalUsers);
       });
  }

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = {id: 0, name: "Masud Wubetu"};
    setUsers([...users, newUser]);

    axios.post('https://jsonplaceholder.typicode.com/users/', newUser)
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

    axios.patch('https://jsonplaceholder.typicode.com/users/' + user.id, updatedUser)
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
