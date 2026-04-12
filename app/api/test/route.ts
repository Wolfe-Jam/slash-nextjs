export async function GET() {
  return new Response(JSON.stringify({
    status: 'ok',
    hasKey: !!process.env.ANTHROPIC_API_KEY,
    keyPrefix: process.env.ANTHROPIC_API_KEY?.slice(0, 10) || 'NOT SET',
  }), { headers: { 'Content-Type': 'application/json' } });
}
