console.log("This is the start of the project");

//declarations
const signupButtonNav = document.getElementById("signupButtonNav");
const loginButtonNav = document.getElementById("loginButtonNav");
const containorWrapper = document.getElementById("containorWrapper");
const searchBar = document.getElementById("searchBar");
const modalBooking = document.getElementById("modalBooking");
const closeModal = document.getElementById("closeModal");

//forms
const nameBooking = document.getElementById("nameBooking");
const emailBooking = document.getElementById("emailBooking");
const phoneBooking = document.getElementById("phoneBooking");
const addressBooking = document.getElementById("addressBooking");
const dateBookinng = document.getElementById("dateBookinng");
const timeBooking = document.getElementById("timeBooking");
const submitBooking = document.getElementById("submitBooking");
const locationUser = document.getElementById("location");

const toprentalscontainor = document.getElementById("toprentalscontainor");
const totime = document.getElementById("totime");
const todate = document.getElementById("todate");

//checling the localstorage (Protected route is implemented here)
if (localStorage.getItem("userID") == null) {
  window.location.href = "index.html";
} else {
  signupButtonNav.innerHTML = "Logout";
  loginButtonNav.innerHTML = "Profile";
}

//checling the localstorage (Protected route is implemented here)
if (localStorage.getItem("userID") == null) {
  window.location.href = "index.html";
} else {
  signupButtonNav.innerHTML = "Logout";
  loginButtonNav.innerHTML = "Profile";
}

//checking if the signup button is logout or not
signupButtonNav.addEventListener("click", () => {
  if (signupButtonNav.innerHTML === "Logout") {
    localStorage.removeItem("userID");
    localStorage.removeItem("user");
    window.location.href = "/";
  }
});

//close Modal
closeModal.addEventListener("click", () => {
  modalBooking.style.display = "none";
});

//modal booking opening and closing
const openModalBooking = (id, ownerID, pricehourly) => {
  console.log(id);
  if (modalBooking.style.display === "flex") {
    modalBooking.style.display = "none";
    return;
  }
  modalBooking.style.display = "flex";
  submitBooking.addEventListener("click", (e) => {
    e.preventDefault();
    //calculating the price if 1hr is 100rs
    const price = pricehourly;
    const time = timeBooking.value;
    const date = dateBookinng.value;
    const time1 = time.split(":");
    const date1 = date.split("-");
    const time2 = totime.value;
    const date2 = todate.value;
    const time3 = time2.split(":");
    const date3 = date2.split("-");
    //checking the number of days in between the from and the todate
    var days = date3[2] - date1[2];
    //checking for the month
    if (date3[1] - date1[1] > 0) {
      days += 30;
    }
    //checking for year
    if (date3[0] - date1[0] > 0) {
      days += 365;
    }
    //checking for the hours
    var hours = time3[0] - time1[0];
    //checking for the minutes
    var minutes = time3[1] - time1[1];
    //calculating the total price
    var totalPrice = (days * 24 + hours) * price + minutes * (price / 60);
    console.log(totalPrice);

    // const id = e.target.parentElement.parentElement;

    const booking = {
      id: Math.random().toString(36).substr(2, 9),
      userID: localStorage.getItem("userID"),
      carID: id,
      ownerID: ownerID,
      name: nameBooking.value,
      email: emailBooking.value,
      phone: phoneBooking.value,
      address: addressBooking.value,
      date: dateBookinng.value,
      toDate: todate.value,
      toTime: totime.value,
      locationUser: locationUser.value,
      status: "Pending",
      time: timeBooking.value,
      price: totalPrice,
    };
    const transaction = db.transaction("purchasedCars", "readwrite");
    const objectStore = transaction.objectStore("purchasedCars");
    const request = objectStore.add(booking);
    request.onsuccess = (e) => {
      console.log("Booking added successfully");
      alert("Booking Confirmed");
      // window.location.reload();
    };
    request.onerror = (e) => {
      console.log(e);
      alert("There was an error while adding the booking");
    };
    console.log(booking);
  });
};

var cars = [];

const transaction = db.transaction("cars", "readonly");
const objectStore = transaction.objectStore("cars");
const request1 = objectStore.openCursor();
var i = 0;
console.log("Fetching the data");
request1.onsuccess = (e) => {
  const cursor = e.target.result;
  if (cursor) {
    if (cursor.value.length === 0) {
      containorWrapper.innerHTML = `<h1 class="text-center">No cars added yet</h1>`;
      return;
    }
    if (i <= 10
      ) {
      containorWrapper.innerHTML += `
      <div
      class="cardContainor bg-white d-flex flex-column bg-white p-4 m-3 cursor-pointer"
      id="${cursor.key}"
    >
      <div
        class="containorInner w-full d-flex justify-content-between px-1"
      >
        <div class="containorTitle">
          <h4>${cursor.value.name}</h4>
          <p class="text-muted text-md">${cursor.value.model}</p>
        </div>
        <i class="fa-solid fa-heart font-size-md text-danger"></i>
      </div>
      <div class="containorImage w-full carSize">
        <img
          src="${cursor.value.image}"
          alt="car"
          class="w-full carSize"
        />
      </div>
      <!-- Information about the car -->
      <div
        class="containorInfo w-full p-2 d-flex justify-content-evenly align-items-center"
      >
        <div
          class="containorSeating d-flex justify-content-center align-items-center"
        >
          <h6><i class="fa-solid fa-user"></i></h6>
          <h6 class="px-2">${cursor.value.carSeating}</h6>
        </div>
        <div
          class="containorSeating d-flex justify-content-center align-items-center"
        >
          <h6><i class="fa-solid fa-gear"></i></h6>
          <h6 class="px-2">Manual</h6>
        </div>
        <div
          class="containorSeating d-flex justify-content-center align-items-center"
        >
          <h4 class="">
            Rs
            <span class="font-weight-bold">${cursor.value.pricehourly}/hr</span>
          </h4>
        </div>
      </div>
      <button id="${cursor.value.id}" class="w-full py-3 outline-none text-black modalColor rounded-sm" onclick='openModalBooking("${cursor.value.id}", "${cursor.value.ownerID}", "${cursor.value.pricehourly}")'> Book Now</button>
    </div> `;
      console.log(cursor.value.ownerID);
      //adding the cars to the array
      cars.push(cursor.value);
    }
    i++;

    cursor.continue();
  }
};

//searching the cars
searchBar.addEventListener("input", (e) => {
  console.log(cars);
  //searching from the cars array
  const filteredCars = cars.filter((car) => {
    return car.name.toLowerCase().includes(e.target.value.toLowerCase());
  });
  console.log(filteredCars);
  containorWrapper.innerHTML = "";
  filteredCars.forEach((car) => {
    containorWrapper.innerHTML += `
    <div
    class="cardContainor bg-white d-flex flex-column bg-white p-4 m-3 cursor-pointer"
    id="${car.id}"
  >
    <div
      class="containorInner w-full d-flex justify-content-between px-1"
    >
      <div class="containorTitle">
        <h4>${car.name}</h4>
        <p class="text-muted text-md">${car.model}</p>  
      </div>
      <i class="fa-solid fa-heart font-size-md text-danger"></i>
    </div>
    <div class="containorImage w-full carSize">
      <img
        src="${car.image}"
        alt="car"
        class="w-full carSize"
      />
    </div>
    <!-- Information about the car -->
    <div
      class="containorInfo w-full p-2 d-flex justify-content-evenly align-items-center"
    >
      <div
        class="containorSeating d-flex justify-content-center align-items-center"
      >
        <h6><i class="fa-solid fa-user"></i></h6>
        <h6 class="px-2">${car.carSeating}</h6>
      </div>
      <div
        class="containorSeating d-flex justify-content-center align-items-center"
      >
        <h6><i class="fa-solid fa-gear"></i></h6>
        <h6 class="px-2">Manual</h6>
      </div>
      <div
        class="containorSeating d-flex justify-content-center align-items-center"
      >
        <h4 class="">
          Rs
          <span class="font-weight-bold">${car.pricehourly}/hr</span>
        </h4>
      </div>
    </div>
    <button id="${car.id}" class="w-full py-3 outline-none text-black modalColor rounded-sm" onclick="openModalBooking(${car.id})"> Book Now</button>
  </div> `;
  });
});

var bookingsData = [];
var users = [];
var cars = [];

// fetchinng the bookings
const transactionBooking = db.transaction(
  ["cars", "purchasedCars", "users"],
  "readonly"
);
const objectStoreBooking = transactionBooking.objectStore("purchasedCars");
const objectStoreUser = transactionBooking.objectStore("users");
const objectStoreCar = transactionBooking.objectStore("cars");
const requestBooking = objectStoreBooking.getAll();
const requestUser = objectStoreUser.getAll();
const requestCar = objectStoreCar.getAll();
//adding the cards according to the data of bookings user and car
requestBooking.onsuccess = function (event) {
  requestUser.onsuccess = function (event) {
    requestCar.onsuccess = function (event) {
      //getting all the data wiith there keys
      bookingsData = requestBooking.result;
      users = requestUser.result;
      cars = requestCar.result;
      console.log(bookingsData);
      console.log(users);
      console.log(cars);
      if (bookingsData && users && cars) {
        bookingsData.forEach((booking) => {
          const user = users.find((user) => user.id === booking.userID);
          console.log(users);
          const car = cars.find((car) => car.id === booking.carID);
          toprentalscontainor.innerHTML += `
          <div
          class="cardTopRentals w-full border-1 p-4 bg-light d-flex flex-card justify-content-around align-items-center my-3"
        >
          <!-- Image               -->
          <div class="containorImage w-25">
            <img
              src="${car.image}"
              alt="car"
              class="w-full carTopRental"
            />
          </div>
          <h6 class="font-weight-bold">${car.name}</h6>
          <h6 class="font-weight-bold">${booking.locationUser}</h6>
          <h6 class="text-muted">${booking.date}</h6>
          <h6 class="text-muted"><i class="fas fa-clock"></i> ${
            booking.time
          }</h6>
          <h6>By, ${user.email}</h6>
          <h4 class="text-danger font-weight-bold">Rs ${booking.price}/-</h4>
          <h6 class="px-4 py-2 ${
            booking.status === "confirmed"
              ? "bg-success"
              : booking.status === "rejected"
              ? "bg-danger"
              : "bg-info"
          } text-white">${booking.status}</h6>
        </div>
          `;
        });
      }
    };
  };
};
