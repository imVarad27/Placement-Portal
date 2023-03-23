const buttons = document.querySelectorAll(".dashboard-anchor");

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    buttons.forEach((btn) => {
      btn.classList.remove("active-anchor");
    });
    if (btn.textContent.trim() === "Logout") {
      window.location.href = "login.html";
      console.log(btn);
      return;
    }
    btn.classList.remove("active-anchor");
    e.currentTarget.classList.add("active-anchor");
  });
});
