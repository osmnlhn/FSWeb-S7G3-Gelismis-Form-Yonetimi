import React from 'react'

const Users = ({ users }) => {
    console.log(users);
  return (
    <div>
      {users.map(user => <p key={user.id}>User name is <strong>{user.name}</strong> and user's email is <strong>{user.email}</strong></p>)}
    </div>
  )
}

export default Users
