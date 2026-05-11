'use client';

import { useEffect, useState } from "react";

export default function UsersList() {
  const [users, setUsers] = useState<{ id: string; email: string }[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.email}</li>
      ))}
    </ul>
  );
}
