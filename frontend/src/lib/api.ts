import { GithubRepository, PortfolioSnapshot } from "@/lib/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:8000/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  getSnapshot: () => request<PortfolioSnapshot>("/portfolio/snapshot/"),
  askAssistant: (query: string) =>
    request<{ answer: string; source?: string }>(
      `/portfolio/assistant/ask/?q=${encodeURIComponent(query)}`,
    ),
  submitContact: (payload: {
    name: string;
    email: string;
    organization?: string;
    message: string;
  }) =>
    request("/communication/contact-messages/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  getGithubRepos: async () => {
    const response = await fetch(
      "https://api.github.com/users/vaibhavgarg1606/repos?per_page=100&sort=updated",
      { cache: "no-store" },
    );
    if (!response.ok) {
      throw new Error(`GitHub request failed with status ${response.status}`);
    }
    return response.json() as Promise<GithubRepository[]>;
  },
};
