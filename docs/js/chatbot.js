const loadingDots = document.getElementById("loading-dots");
const dotsSpan = document.getElementById("dots");
const queryInput = document.getElementById("query");
const sendBtn = document.getElementById("aisend-btn");
const responseBox = document.getElementById("ai-response");
const chatBox = document.getElementById("chat-box");

// Get username from localStorage and use as session ID
const username = localStorage.getItem("username");
if (!localStorage.getItem("isLoggedIn") || !username) {
  alert("Please log in to access the chatbot.");
  window.location.href = "login.html";
} else {
  document.getElementById("username-display").textContent = username;
}

let dotsInterval;

function startLoading() {
  loadingDots.style.display = "block";
  dotsSpan.textContent = "";
  let dotCount = 0;
  dotsInterval = setInterval(() => {
    dotCount = (dotCount + 1) % 4;
    dotsSpan.textContent = ".".repeat(dotCount);
  }, 500);
}

function stopLoading() {
  clearInterval(dotsInterval);
  loadingDots.style.display = "none";
}

queryInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    sendBtn.click();
  }
});

function appendMessage(role, text) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("msg", role.toLowerCase());
  msgDiv.innerHTML = `<strong>Role: ${role}</strong><pre>${text}</pre>`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function loadChatHistory() {
  try {
    const response = await fetch("http://localhost:8000/chathistory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: username }),
    });
    const rawHtml = await response.text();

    // Use a RegExp to extract Role blocks
    const parts = rawHtml.split(/Role: (User|Assistant|Tool) <br> ?/);
    for (let i = 1; i < parts.length; i += 2) {
      const role = parts[i];
      const text = parts[i + 1].replaceAll("<br>", "\n");
      appendMessage(role, text);
    }
  } catch (error) {
    console.error("Failed to load chat history:", error);
    chatBox.innerHTML = "<p style='color:red;'>Could not load chat history.</p>";
  }
}

sendBtn.addEventListener("click", async function () {
  const query = queryInput.value;

  if (!query) {
    alert("Please enter a query.");
    return;
  }

  queryInput.value = "";
  sendBtn.disabled = true;
  startLoading();

  appendMessage("User", query);
  const assistantDiv = document.createElement("div");
  assistantDiv.classList.add("msg", "assistant");
  assistantDiv.innerHTML = `<strong>Role: Assistant</strong><pre></pre>`;
  const pre = assistantDiv.querySelector("pre");
  chatBox.appendChild(assistantDiv);

  try {
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: query,
        session_id: username
      }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      pre.textContent += chunk;
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  } catch (err) {
    console.error("Fetch error:", err);
    pre.textContent = "⚠️ Failed to fetch AI response.";
  } finally {
    stopLoading();
    sendBtn.disabled = false;
  }
});

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
  alert("You have been logged out.");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("fade-in");
  loadChatHistory();
});