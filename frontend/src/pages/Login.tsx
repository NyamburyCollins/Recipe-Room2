import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { User } from "../types/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // for matching only
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedUserJSON = localStorage.getItem("recipe-room-user");

    if (!storedUserJSON) {
      setError("No user found. Please register first.");
      return;
    }

    const storedUser: User & { password?: string } = JSON.parse(storedUserJSON);

    if (storedUser.email !== email || storedUser.password !== password) {
      setError("Invalid email or password.");
      return;
    }

    login(storedUser);
    navigate("/");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;