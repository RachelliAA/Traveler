const BASE_URL = 'http://localhost:5000/api/userTrips';

// Fetch all users
export async function fetchUsers() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}
export async function addUserToTrip(data) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to add user to trip');
  }
  return res.json();
}