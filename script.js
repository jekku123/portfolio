const header = document.querySelector("header");
const button = document.querySelector("#btn");

const burger = document.querySelector(".burger");
const menu = document.querySelector(".nav-menu");
const links = document.querySelectorAll(".nav-item");

const form = document.querySelector("form");
const inputFields = document.querySelectorAll(".input-field");

const toTopBtn = document.querySelector("#backToTop");

const errors = document.querySelectorAll(".error");
const submitBtn = document.querySelector(".sub-btn");

/* FORM START */

let formBody = {
  name: "",
  email: "",
  message: "",
};

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const handleForm = (e) => {
  const { name, value, id } = e.target;
  let isValid;

  if (name === "name") isValid = !value.length || value.length > 2;
  if (name === "email")
    isValid = !value.length || !!value.match(emailRegex);
  if (name === "message") isValid = !value.length || value.length > 1;

  errors.forEach((error) => {
    if (error.id === `${name}-error`) {
      if (isValid) {
        inputFields[+id].className = "input-field valid";
        error.textContent = "";
      } else {
        inputFields[+id].className = "input-field invalid";
        if (name === "name")
          error.textContent = "Name must be atleast 3 characters";
        if (name === "email")
          error.textContent = "Invalid email address";
        if (name === "message")
          error.textContent = "Message must be atleast 2 characters";
      }
    }
  });

  formBody[name] = value;
};

const checkErrors = () => {
  let isError = false;

  if (!formBody.name) {
    inputFields[0].className = "invalid";
    errors[0].textContent = "Please enter your name";
    isError = true;
  }
  if (!formBody.email.match(emailRegex)) {
    inputFields[1].className = "invalid";
    errors[1].textContent = "Please enter your email address";
    isError = true;
  }

  if (!formBody.message) {
    inputFields[2].className = "invalid";
    errors[2].textContent = "Please leave a message";
    isError = true;
  }

  return isError;
};

const sendMessage = () => {
  inputFields.forEach((inputField) => {
    inputField.value = "";
  });
  alert("Message sent!");
  formBody = { name: "", email: "", message: "" };
};

form.addEventListener("input", handleForm);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkErrors() || sendMessage();
});

/* FORM END */

//-----------------------------------------

/* BURGER */

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  menu.classList.toggle("active");
});

links.forEach((link) =>
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    menu.classList.remove("active");
  })
);

/* BURGER END */

window.addEventListener("scroll", () => {
  if (
    document.documentElement.scrollTop > window.innerHeight - 100 ||
    document.body.scrollTop > window.innerHeight - 100
  ) {
    header.style.background = "black";
    menu.style.background = "black";
  } else {
    header.style.background = "none";
    menu.style.background = "none";
  }

  if (
    document.body.scrollTop > 550 ||
    document.documentElement.scrollTop > 550
  ) {
    toTopBtn.classList.add("active");
  } else {
    toTopBtn.classList.remove("active");
  }
});

toTopBtn.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
