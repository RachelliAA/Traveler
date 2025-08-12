import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar({ onLogout, user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();
    localStorage.removeItem("loggedInUser");
    navigate("/rootpage"); 
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <img
          src="/logo.png" 
          alt="Company Logo"
          className={styles.logo}
        />
        <span className={styles.companyName}>Traveler Co.</span>
      </div>
      <div className={styles.right}>
        <Link to="/profile" className={styles.link}>
          View Profile
        </Link>
        <button onClick={handleLogout} className={styles.logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
