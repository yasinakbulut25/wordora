/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FetchOptions extends RequestInit {
  body?: any;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function fetchClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { body, headers, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Fetch Error:", data);
    throw new Error(data.error || "Bir hata oluştu");
  }

  return data;
}
