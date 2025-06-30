    const loadingDots = document.getElementById("loading-dots");
    const dotsSpan = document.getElementById("dots");
    const queryInput = document.getElementById("query");
    const sendBtn = document.getElementById("aisend-btn");
    const responseBox = document.getElementById("ai-response");

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

    sendBtn.addEventListener("click", async function () {
      const query = queryInput.value.trim();

      if (!query) {
        alert("Please enter a query.");
        return;
      }

      queryInput.value = "";
      responseBox.innerHTML = "";
      sendBtn.disabled = true;
      startLoading();

      try {
        const response = await fetch("http://localhost:8000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: query,
            session_id: username // session_id = username
          }),
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        responseBox.textContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          responseBox.textContent += chunk;
          responseBox.scrollTop = responseBox.scrollHeight;
        }
      } catch (err) {
        console.error("Fetch error:", err);
        responseBox.textContent = "⚠️ Failed to fetch AI response.";
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
    });