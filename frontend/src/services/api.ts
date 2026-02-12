const API = "http://localhost:5000/api/clients";

export async function fetchClients() {
  const res = await fetch(API);
  return res.json();
}

export async function createClient(data: any) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}