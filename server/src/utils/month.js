export function monthAbbrFromDate(date) {
  return date.toLocaleString("en-US", { month: "short" }).toUpperCase(); // e.g., "JUN"
}
