import styles from "./ParticipantList.module.css";

export default function ParticipantList({ participants }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Participants</h2>
      {participants.length > 0 ? (
        <ul className={styles.list}>
          {participants.map((p, i) => (
            <li key={i} className={styles.item}>{p}</li>
          ))}
        </ul>
      ) : (
        <p>No participants yet.</p>
      )}
    </div>
  );
}
