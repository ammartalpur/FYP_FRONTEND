/**
 * Utility functions for working with saved API response data
 */

/**
 * Fetch all saved API responses
 */
export async function fetchSavedData() {
  try {
    const response = await fetch("/data/api-responses.json");
    if (!response.ok) throw new Error("Failed to fetch saved data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching saved data:", error);
    return [];
  }
}

/**
 * Download saved data as JSON file
 */
export function downloadDataAsJson() {
  fetchSavedData().then((data) => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = `api-responses-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  });
}

/**
 * Get statistics from saved data
 */
export async function getDataStats() {
  const data = await fetchSavedData();
  return {
    totalRequests: data.length,
    successCount: data.filter((d: any) => d.status === "success").length,
    errorCount: data.filter((d: any) => d.status === "error").length,
    firstRequest: data.length > 0 ? data[0].timestamp : null,
    lastRequest: data.length > 0 ? data[data.length - 1].timestamp : null,
  };
}

/**
 * Clear all saved data
 */
export async function clearSavedData() {
  try {
    // This would require a DELETE endpoint - for now, just log
    console.warn("Clear functionality requires additional setup");
  } catch (error) {
    console.error("Error clearing data:", error);
  }
}
