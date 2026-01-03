// Cloudflare Pages Function to add custom headers
// Place this file in: functions/_middleware.ts

export async function onRequest(context: any) {
  const response = await context.next();
  
  // Clone response to modify headers
  const newResponse = new Response(response.body, response);
  
  // Allow iframe embedding
  newResponse.headers.set('X-Frame-Options', 'ALLOWALL');
  newResponse.headers.set(
    'Content-Security-Policy',
    "frame-ancestors 'self' https://*.pages.dev https://eve-star-ship-web.pages.dev http://localhost:* http://127.0.0.1:*"
  );
  newResponse.headers.set('Access-Control-Allow-Origin', '*');
  
  return newResponse;
}
