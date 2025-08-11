import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserTrips.module.css";

export default function UserTrips() {
  const navigate = useNavigate();

  // Static trips for now
  const [trips] = useState([
    {
      id: 1,
      title: "Santorini Adventure",
      description: "Enjoy the white-washed houses and stunning sunsets.",
      bigImage: "/logo.png",
      images: [
        "/logo.png",
        "/logo.png",
        "/logo.png",
      ],
      price: 1200,
    },
    {
      id: 2,
      title: "Safari in Kenya",
      description: "Experience the wildlife up close in the African savannah.",
      bigImage: "/images/safari_main.jpg",
      images: [
        "/logo.png",
        "/logo.png",
        "/logo.png",
      ],
      price: 2500,
    },
  ]);

  const handleTripClick = (id) => {
    navigate(`/trip/${id}`);
  };

  return (
    <div className={styles.container}>
      <h1>Available Trips</h1>
      <div className={styles.tripGrid}>
        {trips.map((trip) => (
          <div
            key={trip.id}
            className={styles.tripCard}
            onClick={() => handleTripClick(trip.id)}
          >
            <img src={trip.bigImage} alt={trip.title} className={styles.bigImage} />
            <div className={styles.info}>
              <h2>{trip.title}</h2>
              <p>{trip.description}</p>
              <p className={styles.price}>${trip.price}</p>
              <div className={styles.smallImages}>
                {trip.images.map((img, i) => (
                  <img key={i} src={img} alt={`${trip.title} ${i + 1}`} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
