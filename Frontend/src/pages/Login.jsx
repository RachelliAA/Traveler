// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import classes from "./Login.module.css";
// import { loginUser } from "../api/usersApi";

// function Login({ onLogin }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get role from query string (default to traveler)
//   const searchParams = new URLSearchParams(location.search);
//   const role = searchParams.get("role") || "traveler";

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const user = await loginUser(username, password);
//       if (!user) {
//         setError("Invalid username or password");}

//       localStorage.setItem("loggedInUser", JSON.stringify(user));

//       if (user.is_admin) {
//         onLogin(user); // <-- update App state
//         navigate("/admin");
//       } else {
//         onLogin(user); // <-- update App state
//         navigate("/user-trips");
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };




//   return (
//     <div className={classes.body}>
//       <div className={classes.container}>
//         <div className={classes.header}>
//           <div className={classes.text}>
//             {role === "admin" ? "Admin Login" : "Traveler Login"}
//           </div>
//           <div className={classes.underLine}></div>
//         </div>

//         <form onSubmit={handleLogin} className={classes.inputs}>
//           <div className={classes.input}>
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>

//           <div className={classes.input}>
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {error && (
//             <p style={{ color: "red", textAlign: "center" }}>{error}</p>
//           )}

//           <button type="submit" className={classes.submit}>
//             Login
//           </button>
//         </form>

//         <div className={classes.link}>
//           Don't have an account?&nbsp;
//           <span
//             onClick={() => navigate(`/register?role=${role}`)}
//             style={{ cursor: "pointer", color: "#34036c", fontWeight: "bold" }}
//           >
//             Register here
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../api/usersApi";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Alert,
} from "@mui/material";

function Login({ onLogin }) {
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
      if (!user) {
        setError("Invalid username or password");
        return;
      }

      localStorage.setItem("loggedInUser", JSON.stringify(user));

      onLogin(user); // update App state
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
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h5" fontWeight="bold">
            {role === "admin" ? "Admin Login" : "Traveler Login"}
          </Typography>
        </Box>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2, textAlign: "center" }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 1.2, fontWeight: "bold" }}
          >
            Login
          </Button>
        </form>

        <Box textAlign="center" mt={3}>
          <Typography variant="body2">
            Don&apos;t have an account?{" "}
            <Link
              component="button"
              variant="body2"
              sx={{ fontWeight: "bold", color: "primary.main" }}
              onClick={() => 
                navigate(`/register?role=${role}`)}
            >
              Register here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;

