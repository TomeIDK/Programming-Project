btnLogin = document.getElementById("btn-login");

btnLogin.addEventListener("click", async (event) => {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, pass: pass }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Response:", data);
      window.location.href = "/cataloog";
    } else {
      console.error("Request failed with status:", response.status);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
});
