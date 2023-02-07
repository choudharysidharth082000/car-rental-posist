console.log("Login Owner");

const buttonNewAccountOwner = document.getElementById("buttonNewAccountOwner");
const formSubmitLoginOwner = document.getElementById("formSubmitLoginOwner");
const emailOwner = document.getElementById("email");
const passwordOwner = document.getElementById("password");
const errorOwner = document.getElementById("errorOwner");

buttonNewAccountOwner.addEventListener("click", () => {
  window.location.href = "newAccountOwner.html";
});

formSubmitLoginOwner.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Submit Handler");
  //checking if the email and password is present or not
  if (emailOwner.value === "" || passwordOwner.value === "") {
    errorOwner.innerHTML = "Please enter a valid email and password";
    errorOwner.classList.remove("hidden");
  } else {
    console.log("In the ekse block");
    const transaction = db.transaction("users", "readonly");
    const objectStore = transaction.objectStore("users");

    const request = objectStore.openCursor();

    request.onsuccess = function (e) {
      const cursor = e.target.result;
      if (cursor) {
        console.log("Hello world ---> ", cursor);
        if (
          cursor.value.email === emailOwner.value &&
          cursor.value.password === passwordOwner.value
        ) {
          console.log(cursor);
          localStorage.setItem("user", JSON.stringify(cursor.value));
          localStorage.setItem("userID", cursor.value.id);
          console.log("User is present");
          window.location.href = "mainPage.html";
        } else {
          console.log("User is not present");
        }

        cursor.continue();
      }
    };

    request.onerror = function (e) {
      console.log("Error", e);
    };
  }
});
