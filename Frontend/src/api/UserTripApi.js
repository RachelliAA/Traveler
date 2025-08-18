const BASE_URL = 'http://localhost:5000/api/userTrips';
//const tripsUrl
import { updateTrip, fetchTripById } from "./tripsApi";


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
async function fetchUserTripsofUser(user_id){
    const res = await fetch(`${BASE_URL}/user/${user_id}`);
  if (!res.ok) throw new Error('Failed to fetch user trips');
  return res.json();
}




export async function fetchTripsofUser(id) {
  const userTrips = await fetchUserTripsofUser(id)
  //now i have all the trip ids of this user, for each one get its full trip, add it to the list
  console.log("all the trips", userTrips)
  const trips = await Promise.all(
  userTrips.map(ut =>
        fetchTripById(ut.trip_id)
    )
  );
  return trips;

  
  //query to fetch all userTrips by user

}

//const BASE_URL = 'http://localhost:5000/api/userTrips';

export async function fetchTravelersOfTrip(tripId) {
  const res = await fetch(`${BASE_URL}/trip/${tripId}`);
  if (!res.ok) throw new Error("Failed to fetch travelers for trip");
  return res.json();
}

