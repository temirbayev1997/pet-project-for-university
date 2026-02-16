const API_URL = "http://localhost:5000/api";

export async function fetchClients() {
  const res = await fetch(`${API_URL}/clients`);
  return res.json();
}

export async function createClient(data: any) {
  const res = await fetch(`${API_URL}/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchDeals() {
  const res = await fetch(`${API_URL}/deals`);
  return res.json();
}

export async function updateDealStatus(id: number, status: string) {
  const res = await fetch(`${API_URL}/deals/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
}
export async function createDeal(data: any) {
  const res = await fetch(`${API_URL}/deals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}