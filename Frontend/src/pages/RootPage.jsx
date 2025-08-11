import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RootPage.module.css";

export default function RootPage() {
  const navigate = useNavigate();

  // Images for the background slideshow
  const images = [
    "hike1.jpeg",
    "hike2.jpeg",
    "hike1.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Change background every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className={styles.root}
      style={{ backgroundImage: `url(${images[currentIndex]})` }}
    >
      <div className={styles.overlay}>
        <h1 className={styles.logo}>Traveler Co.</h1>
        <div className={styles.buttonGroup}>
          <button
            className={styles.optionButton}
            onClick={() => navigate("/login?role=traveler")}
          >
            Login as Traveler
          </button>
          <button
            className={styles.optionButton}
            onClick={() => navigate("/login?role=admin")}
          >
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
}
