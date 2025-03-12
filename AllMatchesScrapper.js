export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      let date = url.searchParams.get("date");

      // If no date is provided, use today's date in YYYYMMDD format
      if (!date) {
        date = new Date().toISOString().split('T')[0].replace(/-/g, "");
      }

      const response = await fetch(`https://www.fotmob.com/api/matches?date=${date}`);
      const result = await response.text();

      // Set CORS headers
      const headers = new Headers({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
      });

      return new Response(result, { status: 200, headers });
    } catch (error) {
      console.error(error);

      // Set CORS headers for error responses as well
      return new Response("Error fetching data", { 
        status: 500, 
        headers: { "Access-Control-Allow-Origin": "*" } 
      });
    }
  },
};
