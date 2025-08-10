import { useParams, Link } from "react-router-dom";
import ParticipantList from "../components/ParticipantList";
import styles from "./TripDetails.module.css";

export default function TripDetails() {
  const { tripId } = useParams();

  const mockTrips = [
    { id: "101", title: "Paris Adventure", description: "5 days in Paris", date: "2025-09-01" },
    { id: "102", title: "Tokyo Journey", description: "7 days in Tokyo", date: "2025-10-15" }
  ];

  const mockParticipants = {
    "101": ["John Doe", "Alice Smith"],
    "102": ["Bob Johnson"]
  };

  const trip = mockTrips.find(t => t.id === tripId);
  const participants = mockParticipants[tripId] || [];

  if (!trip) {
    return (
      <div className={styles.container}>
        <p>Trip not found.</p>
        <Link className={styles.backLink} to="/">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link className={styles.backLink} to="/">← Back to Dashboard</Link>
      <h1 className={styles.title}>{trip.title}</h1>
      <p className={styles.date}><strong>Date:</strong> {trip.date}</p>
      <p className={styles.description}><strong>Description:</strong> {trip.description}</p>
      <ParticipantList participants={participants} />
    </div>
  );
}
