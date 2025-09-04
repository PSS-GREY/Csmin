let BACKEND_URL = "https://1289b0eade7e.ngrok-free.app"; // <-- your ngrok URL

export function sendMessageToBackend(message) {
  return fetch(`${BACKEND_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: message }),
  })
    .then((res) => res.json())
    .then((data) => data.response)
    .catch((err) => {
      console.error("Error calling backend /predict:", err);
      throw err;
    });
}

export function uploadImageToBackend(file) {
  let formData = new FormData();
  formData.append("file", file);

  return fetch(`${BACKEND_URL}/upload`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => data.result)
    .catch((err) => {
      console.error("Error calling backend /upload:", err);
      throw err;
    });
}
