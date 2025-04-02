// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { login } from "../redux/authSlice";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     if (username.trim()) {
//       dispatch(login({ username })); // Store user data in Redux
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Login</h2>
//       <input
//         type="text"
//         placeholder="Enter your username"
//         className="form-control"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <button className="btn btn-primary mt-3" onClick={handleLogin}>
//         Login
//       </button>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email.trim()) {
      const userData = {
        email,
        role: email === "kundan@gmail.com" ? "admin" : "student", // Assign role
      };

      dispatch(login(userData)); // Store user in Redux
      navigate("/dashboard");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter your email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-primary mt-3" onClick={handleLogin}>
        Login
      </button>

      <p>
  Message: For admin login use 
  <span style={{ color: "red" }}>"kundan@gmail.com"</span>
</p>

    </div>
  );
};

export default Login;
