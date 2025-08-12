const BASE_URL = 'http://localhost:5000/api/trips';

// Fetch all trips
export async function fetchTrips() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch trips');
  return res.json();
}

// Fetch one trip by ID
export async function fetchTripById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch trip');
  return res.json();
}

// Add a new trip
export async function addTrip(tripData) {
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
