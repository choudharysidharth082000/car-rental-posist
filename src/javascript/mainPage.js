console.log("This is the main page");
const containorAddCar = document.getElementById("containorAddCar");
const addCarButton = document.getElementById("addNewCar");
var openedContainor = false;
const carname = document.getElementById("carname");
const carmodel = document.getElementById("carmodel");
const caryear = document.getElementById("caryear");
const carprice = document.getElementById("carprice");
const carimage = document.getElementById("carimage");
const carpricehourly = document.getElementById("carpricehourly");
const carextracharges = document.getElementById("carextracharges");
const containorWrapper = document.getElementById("containorAddCars");
const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");
const cardContainor = document.getElementById("cardContainor");

const SidebarModel = document.getElementById("SidebarModel");
const sidebarCompany = document.getElementById("sidebarCompany");
const sidebarPrice = document.getElementById("sidebarPrice");
const sidebarCapacity = document.getElementById("sidebarCapacity");
const viewOrders = document.getElementById("viewOrders");
const containorTableOrders = document.getElementById("containorTableOrders");
const signupButtonNav = document.getElementById("signupButtonNav");
const loginButtonNav = document.getElementById("loginButtonNav");
const rowsTable = document.getElementById("rowsTable");

var keys = [];

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

//event listener for closing and opening the sidebar
closeSidebar.addEventListener("click", function () {
  if (sidebar.style.width === "0px") {
    sidebar.style.width = "250px";
    sidebar.style.display = "block";
    return;
  }
  sidebar.style.width = "0px";
  sidebar.style.display = "none";
});

//function to open the sidebar on the main Pahge on clicking the card
function openSidebar(id) {
  console.log("This is the id " + id);
  if (sidebar.style.width === "0px") {
    sidebar.style.width = "250px";
    sidebar.style.display = "block";
    return;
  }
  sidebar.style.width = "0px";
  sidebar.style.display = "none";
}

//view Orders
viewOrders.addEventListener("click", function () {
  if (containorTableOrders.style.display === "none") {
    containorTableOrders.style.display = "block";
    return;
  }
  containorTableOrders.style.display = "none";
});

console.log(containorWrapper);
//geeting all the cars from the database
const transaction = db.transaction("cars", "readonly");
const objectStore = transaction.objectStore("cars");
const request1 = objectStore.openCursor();
request1.onsuccess = function (e) {
  const cursor = e.target.result;
  if (cursor) {
    console.log(cursor);
    if (cursor.value.length === 0) {
      containorWrapper.innerHTML = `<h1 class="text-center">No cars added yet</h1>`;
      return;
    }
    if (cursor.value.ownerID === localStorage.getItem("userID")) {
      keys.push(cursor.key);
      console.log("This is the car of the user");
      //creatung the div element
      containorWrapper.innerHTML += `
      <div class="cardContainor bg-white d-flex flex-column bg-white p-4 m-2 cursor-pointer" id="${cursor.key}">
        <div class="containorInner w-full d-flex justify-content-between px-1">
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
            Rs <span class="font-weight-bold">${cursor.value.price}/hr</span>
          </h4>
        </div>
      </div>
    </div>
      `;

      //consoling the cars
      //creating the car element in the mainPage
      //creating the div
    }
    cursor.continue();
  }
};

//dynamic route getting the values frm the params
addCarButton.addEventListener("click", function () {
  console.log(openedContainor);
  if (openedContainor) {
    containorAddCar.style.height = "0";
    containorAddCar.style.display = "none";
    openedContainor = false;
    return;
  }
  containorAddCar.style.display = "block";
  containorAddCar.style.height = "100%";
  openedContainor = true;
  return;
});

containorAddCar.addEventListener("submit", function (e) {
  e.preventDefault();

  const car = {
    //random string in id to make it unique
    id: Math.random().toString(36).substr(2, 9),
    name: carname.value,
    model: carmodel.value,
    year: caryear.value,
    price: carprice.value,
    image: carimage.value,
    carSeating: document.getElementById("carseating").value,
    pricehourly: carpricehourly.value,
    extracharges: carextracharges.value,
    ownerID: localStorage.getItem("userID"),
  };
  const transaction = db.transaction("cars", "readwrite");
  const objectStore = transaction.objectStore("cars");
  //apending the key to the object

  const request = objectStore.add(car);
  request.onsuccess = function (e) {
    console.log("Car Added");
    window.location.href = "mainPage.html";
  };
  request.onerror = function (e) {
    console.log("Error", e);
  };
});

//function to change the booking state to confirmed or rejected
function changeBookingState(id, value) {
  console.log(id, value);
  const transaction = db.transaction("purchasedCars", "readwrite");
  const objectStore = transaction.objectStore("purchasedCars");
  var request1 = objectStore.openCursor();
  request1.onsuccess = function (e) {
    const cursor = e.target.result;
    if (cursor) {
      if (cursor.value.id === id) {
        console.log(cursor.value.id);
        var updateData = cursor.value;
        updateData.status = value;
        console.log("The Updated Value");
        var request = cursor.update(updateData);
        request.onsuccess = function () {
          console.log("Updated");
        };
      }
      cursor.continue();
    }
  }

  
}


//function when clicked on accept
function acceptBooking(id) {
  changeBookingState(id, "confirmed");
  alert("Wohoo Booking Confirmed")
  console.log("Booking Accepted");
}
//function to reject
function rejectBooking(id) {
  changeBookingState(id, "rejected");
  alert("Booking Rejected");
}
//fetching the data and adding the table to the main Memory
const tableOrders = document.getElementById("rowsTable");

const transactionBookings = db.transaction("purchasedCars", "readonly");
const objectStoreBookings = transactionBookings.objectStore("purchasedCars");
const requestBookings = objectStoreBookings.openCursor();
requestBookings.onsuccess = function (e) {
  const cursor = e.target.result;
  var i = 0;
  if (cursor) {
    if (cursor.value.ownerID === localStorage.userID) {
      console.log(cursor.value);
      //creating the table
      tableOrders.innerHTML += `
      <tr>
        <td>${++i}</td>
        <td>${cursor.value.email}</td>
        <td>${cursor.value.locationUser}</td>
        <td>${cursor.value.name}</td>
        <td>${cursor.value.phone}</td>
        <td>${cursor.value.price}</td>
        <td>${cursor.value.date}</td>
        <td>${cursor.value.toDate}</td>
        <td>${cursor.value.time}</td>
        <td>${cursor.value.toTime}</td>
        <td class="d-flex"><button onclick="acceptBooking('${cursor.value.id}')" class="btn btn-success mx-1">Accept</button> <button onclick="rejectBooking('${cursor.value.id}')" class="btn btn-danger">Reject</button></td>
        </tr>
      `;
    }
    cursor.continue();
  }
};




//graph code
// (async function() {
//   const data = [
//     { year: 2010, count: 10 },
//     { year: 2011, count: 20 },
//     { year: 2012, count: 15 },
//     { year: 2013, count: 25 },
//     { year: 2014, count: 22 },
//     { year: 2015, count: 30 },
//     { year: 2016, count: 28 },
//   ];

//   new Chart(
//     document.getElementById('acquisitions'),
//     {
//       type: 'bar',
//       data: {
//         labels: data.map(row => row.year),
//         datasets: [
//           {
//             label: 'Acquisitions by year',
//             data: data.map(row => row.count)
//           }
//         ]
//       }
//     }
//   );
// })();