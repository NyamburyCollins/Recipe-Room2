import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Welcome to Your Dashboard</h2>
      
      {user && (
        <div className="alert alert-success" role="alert">
          Logged in as <strong>{user.username}</strong>
        </div>
      )}

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">My Recipes</h5>
              <p className="card-text">View and manage your personal recipes.</p>
              <button className="btn btn-primary w-100" onClick={() => navigate("/my-recipes")}>
                Go to Recipes
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Bookmarks</h5>
              <p className="card-text">See your saved or favorite recipes.</p>
              <button className="btn btn-warning w-100" onClick={() => navigate("/bookmarks")}>
                View Bookmarks
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Update Profile</h5>
              <p className="card-text">Change your account settings.</p>
              <button className="btn btn-secondary w-100" onClick={() => navigate("/profile")}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-end mt-4">
        <button className="btn btn-danger" onClick={() => {
          localStorage.removeItem("user");
          navigate("/login");
        }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;