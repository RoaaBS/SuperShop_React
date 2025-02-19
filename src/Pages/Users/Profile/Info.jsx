import React, { useContext } from 'react'
import { UserContext } from '../../../Components/User/context/UserContext';

export default function Info() {
  const { user, loading } = useContext(UserContext);

  return (
    <div>
      <h3 className="p-4 ms-5">
        {loading ? "Loading..." : `Name is: ${user?.userName}`}
      </h3>
      <h3 className="p-4 ms-5">
        {loading ? "Loading..." : `Email is: ${user?.email}`}
      </h3>
   
    </div>
  );
}

