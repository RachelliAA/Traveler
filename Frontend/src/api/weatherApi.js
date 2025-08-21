const BASE_URL = 'http://localhost:5000/weather';

export async function fetchWeatherForCity(city) {
  try {
    const res = await fetch(`${BASE_URL}/${city}`);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch weather");
    }

    const data = await res.json(); // ✅ Await JSON here
    return data.forecast.forecastday; // ✅ Access forecast safely
  } catch (err) {
    console.error("Error fetching weather:", err);
    throw err;
  }
}
