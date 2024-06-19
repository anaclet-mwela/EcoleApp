import React from "react";
import { getSession, logout } from "../../actions/authActions";
import { FaUserCircle } from "react-icons/fa";
const Logout = async () => {
  const session = await getSession();
  console.log(session);
  return (
    <div className="text-white flex items-center gap-4">
      <div className="flex items-center gap-2 capitalize">
        <FaUserCircle className="text-2xl" /> {session.username} ,
      </div>
      <div className="">
        <form action={logout}>
          <button>Logout</button>
        </form>
      </div>
    </div>
  );
};

export default Logout;
