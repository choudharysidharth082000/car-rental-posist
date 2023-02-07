console.log("Database script file is called");

var db = null;
const request = indexedDB.open("myDatabase", 1);

request.onupgradeneeded = function (event) {
  db = event.target.result;
  console.log(event);
  console.log(db);
  //creating the table for cars
  db.createObjectStore("cars", { autoIncrement: true });
  db.createObjectStore("owners", { autoIncrement: true });
  db.createObjectStore("users", { autoIncrement: true });
  db.createObjectStore("pricingSet", { autoIncrement: true });
  db.createObjectStore("purchasedCars", { autoIncrement: true });
  db.createObjectStore("bookings", { autoIncrement: true });
  console.log(event.target.result);

  console.log("Upgrade needed is called");
};
request.onsuccess = function (event) {
  db = event.target.result;
  console.log(db);
  console.log("On success function is called");
};
request.onerror = function (event) {
  console.log("Error function is called");
};
