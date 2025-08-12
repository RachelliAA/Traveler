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


// import { useState, useEffect } from "react";
// import TripForm from "../components/TripForm";
// import TripList from "../components/TripList";
// import styles from "./AdminDashboard.module.css";
// import { fetchTrips, addTrip as apiAddTrip } from "../api/tripsApi";

// export default function AdminDashboard({ user }) {
//   const [trips, setTrips] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Load trips from backend on mount
//   useEffect(() => {
//     async function loadTrips() {
//       try {
//         const data = await fetchTrips();
//         setTrips(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadTrips();
//   }, []);

//   // Add trip using API and update state
//   const addTrip = async ({ name, description, start_date, end_date, location, max_tickets, price }) => {
//     try {
//       const newTrip = await apiAddTrip({
//         name,
//         description,
//         start_date,
//         end_date,
//         location,
//         max_tickets,
//         price,
//         available_tickets: max_tickets, // assuming available tickets start equal to max_tickets
//         num_participants: 0,
//         is_active: true,
//       });
//       setTrips(prev => [...prev, newTrip]);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   if (loading) return <p>Loading trips...</p>;
//   if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

//   return (
//     <div className={styles.dashboard}>
//       <h1 className={styles.title}>Welcome, {user?.name} (Admin)</h1>

//       <div className={styles.section}>
//         <TripForm onAddTrip={addTrip} />
//       </div>

//       <div className={styles.section}>
//         <TripList trips={trips} />
//       </div>
//     </div>
//   );
// }
