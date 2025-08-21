const BASE_URL = 'http://localhost:5000/api/trips';

// Fetch all trips
export async function fetchTrips() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch trips');
  return res.json();
}

export async function fetchTripById(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) {
      const errorData = await res.json(); 
      throw new Error(errorData.error || 'Failed to fetch trip');
    }

    return res.json();
  } catch (err) {
    console.error('Error fetching trip:', err);
  }
}


// // fetcha all trips by admin id
// export async function fetchTripsByAdmin(adminId) {
//   const res = await fetch(`${BASE_URL}?admin_id=${adminId}`);
//   if (!res.ok) throw new Error('Failed to fetch trips for admin');
//   return res.json();
// }

export async function fetchTripsByAdmin(adminId) {
  try {
    console.log(`${BASE_URL}/admin/${adminId}`);
    const response = await fetch(`${BASE_URL}/admin/${adminId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch trips for admin");
    }
    // fetch does not have .data, we need to parse JSON
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch trips");
  }
}


// post Add a new trip
export async function addTrip(tripData) {
  console.log("Adding trip:", tripData);
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tripData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to add trip');
  }
  return res.json();
}

// Update a trip by ID
export async function updateTrip(id, tripData) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tripData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to update trip');
  }
  return res.json();
}

// Delete a trip by ID
export async function deleteTrip(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to delete trip');
  }
  return res.json();
}
