import { authFetch } from "./authFetch";

export async function fetchClients() {
  const res = await authFetch("/clients");
  return res?.json();
}

export async function createClient(data: any) {
  const res = await authFetch("/clients", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res?.json();
}

export async function fetchDeals() {
  const res = await authFetch("/deals");
  return res?.json();
}

export async function updateDealStatus(id: number, status: string) {
  const res = await authFetch(`/deals/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return res?.json();
}

export async function createDeal(data: any) {
  const res = await authFetch("/deals", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res?.json();
}

export async function archiveClient(id: number) {
  const res = await authFetch(`/clients/${id}/archive`, {
    method: "PATCH",
  });
  return res?.json();
}

export async function fetchReminders() {
  const res = await authFetch("/reminders");
  return res?.json();
}

export async function createReminder(data: any) {
  const res = await authFetch("/reminders", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res?.json();
}

export async function updateReminderStatus(id: number, isDone: boolean) {
  const res = await authFetch(`/reminders/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ isDone }),
  });
  return res?.json();
}

export async function deleteReminder(id: number) {
  const res = await authFetch(`/reminders/${id}`, {
    method: "DELETE",
  });
  return res?.json();
}

export async function updateReminder(id: number, data: any) {
  const res = await authFetch(`/reminders/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res?.json();
}

export async function updateClient(id: number, data: any) {
  const res = await authFetch(`/clients/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  return res?.json();
}

export async function fetchStats() {
  const res = await authFetch("/stats");
  return res?.json();
}

export async function updateDeal(id: number, data: any) {
  const res = await authFetch(`/deals/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return res?.json();
}