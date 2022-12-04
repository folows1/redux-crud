import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { IUser } from './interfaces/iUser';
import { addUser, deleteUser, updateUsername } from './features/Users';
import { useState } from 'react';
import { UserCard } from './features/UserCard';

function App() {
  const dispatch = useDispatch();
  const userList: IUser[] = useSelector((state: any) => state.users.value);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');

  const cleanForm = () => {
    setName('');
    setUsername('');
  }

  return (
    <div className="App">
      <div className='addUser'>
        <input type='text' placeholder='Enter name' value={name} onChange={(event) => {
          setName(event.target.value);
        }} />
        <input type='text' placeholder='Enter username' value={username} onChange={(event) => {
          setUsername(event.target.value);
        }} />
        <button onClick={() => {
          if (!username || !name || name.trim() === '' || username.trim() === '') return;
          dispatch(addUser({
            id: userList.length + 1,
            name,
            username
          }))
          cleanForm();
        }}>Add User</button>
      </div>
      <div className='displayUsers'>
        {userList.map((user) => {
          return <UserCard key={user.id} user={user} />
        })}
      </div>
    </div>
  )
}

export default App
