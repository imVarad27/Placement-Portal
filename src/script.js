const forms = document.querySelector(".forms"),
  pwShowHide = document.querySelectorAll(".eye-icon"),
  links = document.querySelectorAll(".link"),
  userNav = document.querySelector(".user-nav"),
  linkedinSignup = document.querySelector(".linkedin-signup");

pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    let pwFields =
      eyeIcon.parentElement.parentElement.querySelectorAll(".password");

    pwFields.forEach((password) => {
      if (password.type === "password") {
        password.type = "text";
        eyeIcon.classList.replace("bx-hide", "bx-show");
        return;
      }
      password.type = "password";
      eyeIcon.classList.replace("bx-show", "bx-hide");
    });
  });
});

const email = document.querySelector(".input");
const password = document.querySelector(".password");
const buttonLogin = document.querySelector(".btn-login");

buttonLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (email.value === "admin" && password.value === "admin") {
  }
  if (email.value === "abc" && password.value === "abc") {
    window.location.href = "studentPage.html";
  }
});

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    forms.classList.toggle("show-signup");
  });
});

// userNav.addEventListener("click", (e) => {
//   if (e.target.tagName === "A") {
//     e.preventDefault();
//     userNav.querySelectorAll("a").forEach((a) => {
//       a.style.color = "#6741d9";
//       a.style.fontWeight = "normal";
//       a.classList.remove("active-user");
//     });
//     e.target.style.color = "black";
//     e.target.style.fontWeight = "bold";
//     e.target.classList.add("active-user");
//   }
// });
