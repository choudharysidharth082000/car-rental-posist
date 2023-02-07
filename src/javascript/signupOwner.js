console.log("This is the owner signupl");
const formsignupOwner = document.getElementById("formsignupOwner");
const emailOwner = document.getElementById("emailOwner");
const passwordOwner = document.getElementById("passwordOwner");
const errorOwner = document.getElementById("errorOwner");
const passwordValidate = document.getElementById("passwordValidate");
const buttonNewAccountOwner = document.getElementById("buttonNewAccountOwner");
console.log(buttonNewAccountOwner);
var emailError = false;
var passwordError = false;

const validate = (inputVal, regex) => {
  return inputVal.match(regex);
};

//event listener for the new account button
buttonNewAccountOwner.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "loginOwnerShop.html";
});

//consolinng the users in teh indexed db

//checking the email
emailOwner.addEventListener("input", function (e) {
  e.preventDefault();
  if (!validate(emailOwner.value, /\S+@\S+\.\S+/)) {
    emailError = true;
    errorOwner.innerHTML = "Please enter a valid email";
    errorOwner.classList.remove("hidden");
  } else {
    errorOwner.classList.add("hidden");
  }
});

//password event listener
passwordOwner.addEventListener("input", (e) => {
  console.log("Hello world");
  if (passwordOwner.value.length === 0) {
    passwordValidate.style.display = "none";
  } else {
    passwordValidate.style.display = "block";
  }
  const tests = [
    {
      length: ".{8,}",
      id: "length",
      error_message: "Length Should be Atleast 10 characters long",
    },
    {
      length: "[A-Z]+",
      id: "uppercase",
      error_message: "Should contain atleast one uppercase letter",
    },
    {
      length: "[a-z]+",
      id: "lowercase",
      error_message: "Should contain atleast one lowercase letter",
    },
    {
      length: "[0-9]{2,}",
      id: "number",
      error_message: "Should contain atleast two numbers",
    },
  ];
  //for every input checking every regex
  tests.forEach((test) => {
    const element = document.getElementById(test.id);
    if (passwordOwner.value.match(test.length)) {
      element.classList.add("text-success");
    } else {
      element.style.color = "#E50914";
      passwordError = false;
    }
  });
});

formsignupOwner.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Started Dunctions");
  //adding the value in the database
  console.log(emailError, passwordError);
  console.log("Hello world");
  const data = {
    id: Math.random().toString(36).substr(2, 9),
    email: emailOwner.value,
    password: passwordOwner.value,
    userType: "owner",
  };
  console.log(data);
  console.log(db);
  const transaction = db.transaction(["users"], "readwrite");
  const objectStore = transaction.objectStore("users");
  const request = objectStore.add(data);
  request.onsuccess = function (event) {
    console.log("Data is added to the database");
    window.localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("userID", data.id);
    window.location.href = "mainPage.html";
  };
  request.onerror = function (event) {
    console.log("Error occured while adding the data");
  };
});
