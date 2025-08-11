import { useState } from "react";
import TripForm from "../components/TripForm";
import TripList from "../components/TripList";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard({ user }) {
  const [trips, setTrips] = useState([
    { id: "101", title: "Paris Adventure", description: "5 days in Paris", date: "2025-09-01" },
    { id: "102", title: "Tokyo Journey", description: "7 days in Tokyo", date: "2025-10-15" }
  ]);

  const addTrip = (title, description, date) => {
    const newTrip = {
      id: String(Date.now()), // quick unique ID
      title,
      description,
      date
    };
    setTrips(prev => [...prev, newTrip]);
  };

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Welcome, {user?.name} (Admin)</h1>

      <div className={styles.section}>
        <TripForm onAddTrip={addTrip} />
      </div>

      <div className={styles.section}>
        <TripList trips={trips} />
      </div>
    </div>
  );
}
