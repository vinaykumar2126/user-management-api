import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { loginSuccess } from "../store/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      console.log("inside try");

      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password
      });

      console.log("Login success:", res.data);
      const token = res.data.token;

      dispatch(loginSuccess({ token }));
      console.log(token);

      // Save token returned by backend
      setToken(res.data.token);

      // Optionally save token to localStorage
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div>
      <h2>Login</h2>

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

      <button className = "button" onClick={handleSubmit}>Submit</button>

      {token && (
        <p style={{ marginTop: 20 }}>
          <strong>Token:</strong> {token}
        </p>
      )}
    </div>
  );
}

export default Login;
