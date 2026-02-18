// A tiny safe date formatter for data.
export default function formatDate(date) {
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d)) return ""; // guard for bad values
  
    return d.toLocaleDateString("en-US", {
      month: "short", // Jan
      day: "numeric", // 1
      year: "numeric" // 2026
    });
  }