export async function onRequest({ request, params }) {
  const url = new URL(request.url)
  const path = params.path || []

  // 构建目标URL
  const targetUrl = `https://cherrysopenbiocrad.gudupao2022-eae.workers.dev/${path.join('/')}${url.search}`

  // 创建新请求，保留原始方法和头
  const newRequest = new Request(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
  })

  // 移除可能导致问题的头
  newRequest.headers.delete('host')

  try {
    const response = await fetch(newRequest)

    // 创建新响应，添加CORS头
    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...Object.fromEntries(response.headers),
        'Access-Control-Allow-Origin': 'https://openbiocard-web.pages.dev',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })

    return newResponse
  } catch (error) {
    return new Response('Proxy Error', { status: 500 })
  }
}