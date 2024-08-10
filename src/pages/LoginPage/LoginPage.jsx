import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { login } from "../../services/authService"; 
import { useDispatch } from "react-redux";
import { setToken, setUserProfile } from "../../store/reducers/userSlice";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Added state for errors
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await login(email, password);
    console.log(data);
    
      dispatch(setToken(data.body.token));
      
      localStorage.setItem("token", data.body.token); 
    

      navigate(`/profile`); 
    } catch (error) {
      setError("Mot de passe ou email incorrect"); // Set error message
    }
  };

  return (
    <main className="main bg-dark ">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;