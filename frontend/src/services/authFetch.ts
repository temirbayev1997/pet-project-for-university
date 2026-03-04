const API_URL = "http://localhost:5000/api";

export async function authFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const token =
  localStorage.getItem("access") ||
  localStorage.getItem("token");

  const isFormData = options.body instanceof FormData;

  const headers: any = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // if (res.status === 401) {
  //   localStorage.removeItem("token");
  //   window.location.href = "/login";
  //   return;
  // }

  return res;
}