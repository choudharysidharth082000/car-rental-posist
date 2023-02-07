console.log("Hello world");

const loginButton = document.getElementById("loginButton");
const email = document.getElementById("email");
console.log("This is the email", email);
const password = document.getElementById("password");
const formLogin = document.getElementById("formLogin");

const sampleButton = document.getElementById("sampleButton");

sampleButton.addEventListener("click", async () => {
  console.log("Button is clicked");
  // authentication.sampleAdd(1,2);
  //quering the data by the name
  
  alert(data);
});

//getting the email and the password
email.addEventListener("input", () => {
  console.log(email.value);
});

password.addEventListener("input", () => {
  console.log(password.value);
});

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Submit Form");
  //login the user with the details
  const response = authentication.signup(
    email.value,
    password.value,
    "sidharth",
    "sampleURL",
    "sampleAddress"
  );
  // const response = authentication.login(email.value, password.value);
  console.log(response);
});
