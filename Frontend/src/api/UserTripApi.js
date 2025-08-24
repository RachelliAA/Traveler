const BASE_URL = 'http://localhost:5000/api/userTrips';
//const tripsUrl
import { updateTrip, fetchTripById } from "./tripsApi";


export async function addUserToTrip(userTrip, trip, tickets) {
  let firstAdd = false;
  let toChange = null;

try {
  const response = await fetchUserTrip(userTrip.user_id, userTrip.trip_id);

  if (response) {
    // Not found → first add
    toChange=response
  }
  else{
    firstAdd = true;
  }
} catch (err) {
  // Network or unexpected error → treat as first add
  firstAdd = true;
}

if (!firstAdd) {
  // Existing user trip → update it
  changeTripOrder(toChange, trip, tickets);
  return;
}

// First add → create new user trip


  if (!firstAdd) {
    // If the user already has a trip, change the order
    changeTripOrder(toChange, trip, tickets);
    return;
  }

  // If first add, create a new userTrip
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userTrip),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to add user to trip');
  }

  // Update trip to have fewer available tickets
  const newTrip = { ...trip, available_tickets: trip.available_tickets - userTrip.number_of_tickets };
  await updateTrip(trip._id, newTrip);

  return res.json();
}

async function fetchUserTripsofUser(user_id){
    const res = await fetch(`${BASE_URL}/user/${user_id}`);
  if (!res.ok) throw new Error('Failed to fetch user trips');
  return res.json();
}

export async function cancelTripOrder(usertrip, trip) {
  const res = await fetch(`${BASE_URL}/${usertrip._id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to delete user trip");
  }


  const newTrip = {
    ...trip,
    available_tickets: trip.available_tickets + (usertrip.number_of_tickets || 0),
  };

  await updateTrip(trip._id, newTrip);
}

export async function changeTripOrder(usertrip, trip, tickets){
  const newUT={...usertrip, number_of_tickets: usertrip.number_of_tickets+tickets} 
    const res = await fetch(`${BASE_URL}/${usertrip._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUT),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to update user trip');
  }
  const newTrip = { ...trip, available_tickets: trip.available_tickets - tickets };

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


export async function fetchTravelersOfTrip(tripId) {
  const res = await fetch(`${BASE_URL}/trip/${tripId}`);
  if (!res.ok) throw new Error("Failed to fetch travelers for trip");
  return res.json();
}

export async function fetchUserTrip(user_id, trip_id){
  return (await fetchUserTripsofUser(user_id)).find(item => item.trip_id === trip_id)  
}
