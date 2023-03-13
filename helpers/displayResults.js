// Importaciones locales
import { capitalize } from "./capitalize.js";

export const displayResults = ( locationInfo, weatherInfo) => {
  const { name, longitude, latitude } = locationInfo;
  const { averageTemp, minTemp, maxTemp, description } = weatherInfo;

  console.log(`\nLocation: ${name.green}`);
  console.log(`Latitude: ${latitude}`);
  console.log(`Longitude: ${longitude}`);
  console.log(`Average Tempeture: ${averageTemp} °C`);
  console.log(`Minimum Tempeture: ${minTemp} °C`);
  console.log(`Maximim Tempeture: ${maxTemp} °C`);
  console.log(`Weather description: ${capitalize(description).green}`);
}