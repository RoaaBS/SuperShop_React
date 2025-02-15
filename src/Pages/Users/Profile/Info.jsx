import React, { useContext } from 'react'
import { UserContext } from '../../../Components/User/context/UserContext';

export default function Info() {
  const { user, loading } = useContext(UserContext);

  return (
    <div>
      <h2 className="p-4">
        {loading ? "Loading..." : `Name is: ${user?.userName}`}
      </h2>
    </div>
  );
}

