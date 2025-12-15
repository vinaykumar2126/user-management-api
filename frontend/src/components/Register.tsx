import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      setMessage("Registration successful! You can now log in.");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input className = "input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input className = "input"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input className = "input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select className = "select" value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
      </select>

      <button className = "button" onClick={handleSubmit}>Register</button>

      {message && <p className = "message">{message}</p>}
    </div>
  );
}

export default Register;
