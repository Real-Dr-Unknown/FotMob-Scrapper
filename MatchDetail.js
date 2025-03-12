export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      let matchID = url.searchParams.get("matchid");

      const headers = new Headers({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
      });
      
      if (!matchID) {
        return new Response("No Match ID was Provided", {status: 200});
      }

      const response = await fetch(`https://www.fotmob.com/api/matchDetails?matchId=${date}`);
      const result = await response.text();

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
