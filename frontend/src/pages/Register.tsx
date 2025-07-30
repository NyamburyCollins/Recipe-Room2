import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../store";
import { registerUser } from "../store/authSlice";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleRegister = async (formData: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      await dispatch(registerUser(formData)).unwrap();
      navigate("/login", {
        state: { success: "Account created successfully. Please log in." },
      });
    } catch (err: any) {
      alert(err?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="col-md-6">
        <div className="card shadow p-4 bg-white">
          <h2 className="text-center text-primary mb-4">Create Your Account</h2>
          <RegisterForm onSubmit={handleRegister} />
        </div>
      </div>
    </div>
  );
};

export default Register;