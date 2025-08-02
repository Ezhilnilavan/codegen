import fetch from 'node-fetch';

export async function fetchDesignTokens({ mcpUrl }) {
  const res = await fetch(mcpUrl);
  if (!res.ok) throw new Error(`Failed to fetch tokens: ${res.status}`);
  return await res.json();
}
