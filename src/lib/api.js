const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8080";

export class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

async function parseErrorMessage(response) {
  try {
    const data = await response.json();
    return (
      data.detail ||
      data.message ||
      data.error ||
      (typeof data === "string" ? data : null) ||
      `Request failed (${response.status})`
    );
  } catch {
    return `Request failed (${response.status})`;
  }
}

async function request(path, { method = "GET", body } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new ApiError(await parseErrorMessage(response), response.status);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function createUser({ name, email, password }) {
  return request("/api/createUser", {
    method: "POST",
    body: {
      customerName: name,
      email,
      password,
    },
  });
}

export function loginUser({ email, password }) {
  return request("/api/login", {
    method: "POST",
    body: { email, password },
  });
}

const SESSION_KEY = "taskflow_user";

export function saveSession(user) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}

export function getSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
