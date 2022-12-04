import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { IUser } from './interfaces/iUser';
import { addUser, deleteUser, updateUsername } from './features/Users';
import { useState } from 'react';

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
          return <div key={user.id}>
            <h1> {user.name} </h1>
            <h1> {user.username} </h1>
            <input type='text' placeholder='Update username...'
              name={user.id.toString()}
              id={user.id.toString()}
              onChange={(event) => {
                setNewUsername(event.target.value);
              }}
            />
            <button onClick={
              () => {
                if (!newUsername || newUsername.trim() === '') return;
                dispatch(updateUsername({
                  id: user.id,
                  username: newUsername
                }))
              }
            }>Update Username</button>
            <button
              onClick={() => {
                dispatch(deleteUser({ id: user.id }))
              }}>Delete User</button>
          </div>
        })}
      </div>
    </div>
  )
}

export default App
