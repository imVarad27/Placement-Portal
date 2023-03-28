const buttons = document.querySelectorAll(".dashboard-anchor");
const applicationPage = document.querySelectorAll(".form-student");
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    buttons.forEach((btn) => {
      btn.classList.remove("active-anchor");
    });
    applicationPage.forEach((page) => {
      page.classList.add("inactive-page");
    });
    if (btn.textContent.trim() === "Logout") {
      window.location.href = "login.html";
      return;
    }
    btn.classList.remove("active-anchor");
    e.currentTarget.classList.add("active-anchor");
    if (btn.textContent.trim().includes("Application")) {
      applicationPage[1].classList.remove("inactive-page");
      console.log(applicationPage[1]);
    }
    if (btn.textContent.trim().includes("Profile")) {
      applicationPage[0].classList.remove("inactive-page");
      console.log(applicationPage[1]);
    }
  });
});
