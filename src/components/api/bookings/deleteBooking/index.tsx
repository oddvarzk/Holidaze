import env from "../../Config";

export async function deleteBooking(bookingId: string): Promise<void> {
  if (!env.apiBaseUrl) {
    throw new Error(
      "API base URL is not defined. Check your environment variables."
    );
  }

  const endpoint = `/holidaze/bookings/${encodeURIComponent(bookingId)}`;
  const url = new URL(endpoint, env.apiBaseUrl);

  // Retrieve the access token from localStorage
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found. Please log in.");
  }

  try {
    const response = await fetch(url.toString(), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": env.apiKey,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete booking.");
    }
    console.log("Booking deleted successfully.");
  } catch (error: any) {
    console.error("Error deleting booking:", error);
    throw new Error(
      error.message || "An unknown error occurred while deleting the booking."
    );
  }
}
