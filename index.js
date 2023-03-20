"use strict";
const getUser = document.querySelectorAll(".user");

getUser.forEach((usr) =>
  addEventListener("click", (e) => {
    e.preventDefault();
    usr.classList.toggle("active");
    usr.removeEventListener("click");
  })
);
