import { useState } from "react";
import styles from "./TripForm.module.css";

export default function TripForm({ onAddTrip }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTrip(title, description, date);
    setTitle("");
    setDescription("");
    setDate("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className={styles.input}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        className={styles.input}
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button className={styles.button} type="submit">Add Trip</button>
    </form>
  );
}
