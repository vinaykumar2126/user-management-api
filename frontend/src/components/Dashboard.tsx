import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAppSelector } from "../store/hooks";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("Fetching users...");
        const res = await axiosInstance.get("/users");
        setUsers(res.data.users || res.data); // depending on your backend response
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    if (isLoggedIn) {
      fetchUsers();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <h3>Please log in first.</h3>;
  }

  return (
    <div className = "container">
      <h2>Dashboard (Protected)</h2>

      <ul className = "list">
        {users.map((u: any) => (
          <li key={u._id}>{u.name} — {u.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
