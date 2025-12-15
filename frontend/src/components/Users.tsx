import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAppSelector } from "../store/hooks";

function Users() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/users");
        setUsers(res.data.users || res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <h3>Please log in to view users.</h3>;
  }

  return (
    <div className="container">
      <h2>Users List</h2>

      <ul className="list">
        {users.map((u: any) => (
          <li key={u._id}>
            <strong>{u.name}</strong> — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
