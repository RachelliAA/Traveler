// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();

//   return (
//     <>
//       here will be login meanwhile just links to other pages
//       <button onClick={()=>navigate('/home')}>Home page</button>
//       <button onClick={()=>navigate('/newtrip')}>New trip</button>
//       <button onClick={()=>navigate('/details')}>trip details</button>
//     </>
//   );
// }

// export default Login;


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// //import { MdPerson, MdLock } from 'react-icons/md';
// import classes from './Login.module.css';

// function Login() {

//     // State hooks
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         navigate(`UserTrips`);
//         // try {
//         //     // GET request to find the user using fetch
//         //     const response = await fetch(`http://localhost:3000/users?username=${username}`);
//         //     if (!response.ok) throw new Error("Failed to fetch");

//         //     const data = await response.json();
//         //     const user = data[0];

//         //     if (user && user.website === password) {
//         //         localStorage.setItem('loggedInUser', JSON.stringify(user));
//         //         // Redirect to the home page
//         //         navigate(`/users/${user.id}/home`);
//         //     } else {
//         //         setError("Incorrect username or password");
//         //     }

//         // } catch (err) {
//         //     setError("Server error");
//         // }
//     };

//     return (
//         <div className={classes.body}>
//             <div className={classes.container}>
//                 <div className={classes.header}>
//                     <div className={classes.text}>Login</div>
//                     <div className={classes.underLine}></div>
//                 </div>

//                 <form onSubmit={handleLogin} className={classes.inputs}>
//                     <div className={classes.input}>
//                         {/* <MdPerson className={classes.icon} /> */}
//                         <input
//                             type="text"
//                             placeholder="Username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                         />
//                     </div>

//                     <div className={classes.input}>
//                         {/* <MdLock className={classes.icon} /> */}
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>

//                     {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

//                     <button type="submit" className={classes.submit}>Login</button>
//                 </form>

//                 <div className={classes.link}>
//                     Don't have an account?&nbsp;
//                     <span onClick={() => navigate('/register')} style={{ cursor: 'pointer', color: '#34036c', fontWeight: 'bold' }}>
//                         Register here
//                     </span>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;



import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "./Login.module.css";
import { loginUser } from "../api/usersApi";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Get role from query string (default to traveler)
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get("role") || "traveler";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await loginUser(username, password);
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      if (user.is_admin) {
        navigate("/admin");
      } else {
        navigate("/user-trips");
      }
    } catch (err) {
      setError(err.message);
    }
  };




  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.text}>
            {role === "admin" ? "Admin Login" : "Traveler Login"}
          </div>
          <div className={classes.underLine}></div>
        </div>

        <form onSubmit={handleLogin} className={classes.inputs}>
          <div className={classes.input}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={classes.input}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}

          <button type="submit" className={classes.submit}>
            Login
          </button>
        </form>

        <div className={classes.link}>
          Don't have an account?&nbsp;
          <span
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer", color: "#34036c", fontWeight: "bold" }}
          >
            Register here
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
