let BACKEND_URL = "";

async function getBackendUrl() {
  if (!BACKEND_URL) {
    const res = await fetch("http://127.0.0.1:5000/backend_url"); // Flask local route
    const data = await res.json();
    BACKEND_URL = data.backend_url;
    console.log("✅ Using backend:", BACKEND_URL);
  }
  return BACKEND_URL;
}

export async function sendMessageToBackend(message) {
  const url = await getBackendUrl();
  const res = await fetch(`${url}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: message }),
  });
  const data = await res.json();
  return data.response;
}
