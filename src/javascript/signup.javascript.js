console.log("Signup Javascript...");
// const email = document.getElementById("email");
// const password = document.getElementById("password");
// const cpassword = document.getElementById("cpassword");
// const namme = document.getElementById("name");
// const address = document.getElementById("address");
// const signup = document.getElementById("signup");

// //signup form

// signup.addEventListener("submit", (e) => {
//   e.preventDefault();
//   if (
//     validations.validateEmail(email.value) &&
//     validations.validatePassword(password.value) &&
//     name && password && cpassword
//   ) {
//     //checking if the email exists in the database
//     const transaction = db.transaction("users", "readwrite");
//     const objectStore = transaction.objectStore("users");
//     const request = objectStore.get(email.value);
//     request.onsuccess = function (event) {
//       if (request.result) {
//         alert("Email already exists");
//       } else {
//         //adding the user to the database
//         const transaction = db.transaction("users", "readwrite");
//         const objectStore = transaction.objectStore("users");
//         const request = objectStore.add({
//           email: email.value,
//           password: password.value,
//           name: name.value,
//           address: address.value,
//         });
//         request.onsuccess = function (event) {
//           alert("User added successfully");
//         };
//         request.onerror = function (event) {
//           alert("Error adding user");
//         };
//       }
//     }
//   } else {
//     console.log("Email and the password are invalid ");
//   }
// });

const signupButtonNav = document.getElementById("signupButtonNav");
const modalNav = document.getElementById("modalNav");
var openedModal = false;

signupButtonNav.addEventListener("click", (e) => {
  e.preventDefault();
  if (openedModal) {
    modalNav.style.transition = "height 0.5s ease-in-out";
    modalNav.style.height = "0px";
    modalNav.style.display = "none";
    openedModal = false;
  } else {
    modalNav.style.transition = "height 0.5s ease-in-out";
    modalNav.style.height = "100%";
    modalNav.style.display = "block";
    openedModal = true;
  }
});
