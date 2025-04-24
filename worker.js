addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Api-Key',
        'Access-Control-Max-Age': '86400',
      }
    })
  }

  try {
    const body = await request.json()
    const { url, xApiKey, data, method = 'POST' } = body

    // Forward the request to LNBits
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(xApiKey && { 'X-Api-Key': xApiKey })
      },
      ...(data && { body: JSON.stringify(data) })
    })

    const responseData = await response.json()

    // Return the response with CORS headers
    return new Response(JSON.stringify(responseData), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Api-Key'
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
} 