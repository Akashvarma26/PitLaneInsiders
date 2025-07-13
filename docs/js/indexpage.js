    document.addEventListener("DOMContentLoaded", function () {
      document.body.classList.add("fade-in");
    });

    function PrivacyPolicy() {
      messages = [
        "We collect your username, email, and password during login/signup. These details are securely stored in our database.",
        "Users are advised not to use their personal or original email/passwords. You may use a dummy email and password for login.",
        "Your login activity and chat history (used with the AI chatbot) may be stored to improve your experience.",
        "We do not request or collect any sensitive personal or financial information.",
        "You may request to delete your data by contacting the site owner through github link in socials."
      ];
      const formatted = messages.map(msg => `• ${msg}`).join('\n');
      alert("Privacy Policy:\n\n"+formatted);
    }

    function TermsConditions() {
      messages = [
        "This site is a fan-based project, not officially affiliated with Formula One or any racing organization.",
        "We may use localStorage or cookies to save login states and preferences.",
        "The chatbot is powered by AI and may not always provide accurate or reliable information.",
        "We do not share or sell your personal data with third parties.",
        "By using this site, you agree to use it for educational and entertainment purposes only.",
        "We are not liable for any decisions made based on chatbot responses or site content."
      ];
      const formatted = messages.map(msg => `• ${msg}`).join('\n');
      alert("Terms & Conditions:\n\n"+formatted);
    }

    function CodeConduct() {
      messages = [
        "Be respectful and ethical when using the platform and interacting with the chatbot.",
        "Do not attempt to exploit, spam, or inject malicious content into any part of the platform.",
        "Avoid using offensive, abusive, or inappropriate language with the chatbot or forms.",
      ];
      const formatted = messages.map(msg => `• ${msg}`).join('\n');
      alert("Code of Conduct:\n\n"+formatted);
    }