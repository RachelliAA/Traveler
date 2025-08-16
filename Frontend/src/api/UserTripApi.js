const BASE_URL = 'http://localhost:5000/api/userTrips';
//const tripsUrl
import { updateTrip } from "./tripsApi";
export async function addUserToTrip(userTrip, trip) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userTrip),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to add user to trip');
  }
  //update trip to have one less spot available:
  const newTrip={...trip, available_tickets: trip.available_tickets-userTrip.number_of_tickets}
  const res2 = await updateTrip(newTrip._id, newTrip)
  return res.json();
}
export async function fetchUserTripsofUser(id) {


  const res = await fetch(`${BASE_URL}/user/${id}`);
  if (!res.ok) throw new Error("Failed to fetch trips of this user");
  //now i have all the trip ids of this user, for each one get its full trip, add it to the list
  return res.json();

}
