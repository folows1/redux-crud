import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser, updateUsername } from '../features/Users';
import { IUser } from '../interfaces/iUser';

export function UserCard({ user }: { user: IUser }) {
    const dispatch = useDispatch();
    const [newUsername, setNewUsername] = useState('');

    return (
        <div key={user.id}>
            <h1> {user.name} </h1>
            <h1> {user.username} </h1>
            <input type='text' placeholder='Update username...'
                value={newUsername}
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
                    setNewUsername('');
                }
            }>Update Username</button>
            <button
                onClick={() => {
                    dispatch(deleteUser({ id: user.id }))
                }}>Delete User</button>
        </div>
    )
}