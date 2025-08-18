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

export async function cancelTripOrder(user_id, trip, tickets){
  //delete user trip, returns number of tickets
  const newTrip={...trip, available_tickets: trip.available_tickets+tickets}
  updateTrip(trip._id, newTrip)
}
export async function changeTripOrder(user_id, trip_id, tickets){
  //edit user trip:
  //return where user trip both ids match
  //take that id and edit num tickets

  const newTrip={...trip, available_tickets: trip.available_tickets+tickets}
  updateTrip(trip._id, newTrip)
}


export async function fetchTripsofUser(id) {
  const userTrips = await fetchUserTripsofUser(id)
  //now i have all the trip ids of this user, for each one get its full trip, add it to the list
  const trips = await Promise.all(
  userTrips.map(ut =>
        fetchTripById(ut.trip_id).then(console.log("gooooood"))
      .catch(err => console.log(err.message))
    )
  );
      
  return trips;

  

}

//const BASE_URL = 'http://localhost:5000/api/userTrips';

export async function fetchTravelersOfTrip(tripId) {
  const res = await fetch(`${BASE_URL}/trip/${tripId}`);
  if (!res.ok) throw new Error("Failed to fetch travelers for trip");
  return res.json();
}

