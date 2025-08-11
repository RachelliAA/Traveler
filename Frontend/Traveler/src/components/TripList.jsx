import { Link } from "react-router-dom";
import styles from "./TripList.module.css";

export default function TripList({ trips }) {
  return (
    <div>
      <h2>Planned Trips</h2>
      <ul className={styles.list}>
        {trips.map(trip => (
          <li key={trip.id} className={styles.item}>
            <Link className={styles.link} to={`/trip/${trip.id}`}>
              <strong>{trip.title}</strong> — {trip.date}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
