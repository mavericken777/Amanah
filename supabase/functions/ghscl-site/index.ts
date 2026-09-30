/** Retired duplicate microsite: the current public website is published through GitHub Pages. */
Deno.serve((request: Request) => {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS" } });
  if (!["GET", "HEAD"].includes(request.method)) return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD, OPTIONS" } });
  return new Response(null, {
    status: 307,
    headers: {
      Location: "https://mavericken777.github.io/Amanah/",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
    },
  });
});
