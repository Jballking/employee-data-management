// Initialize Firebase -- change this to our database
var firebaseConfig = {
    apiKey: "AIzaSyBQo-4cYgqFXIY6GqQQ4u3P0d7qunvk08g",
    authDomain: "employee-database-4fc9f.firebaseapp.com",
    databaseURL: "https://employee-database-4fc9f.firebaseio.com",
    projectId: "employee-database-4fc9f",
    storageBucket: "employee-database-4fc9f.appspot.com",
    messagingSenderId: "852816851571",
    appId: "1:852816851571:web:be32a8a3574d245ef47006"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 // Create a variable to reference the database.
 var database = firebase.database();
 // Initial Values
 var name = "";
 var role = "";
 var started = 0;
 var rate = 0;
 // Capture Button Click
 $("form").on("click", "#add-employee", function(event) {
   event.preventDefault();
   // Grabbed values from text boxes
   name = $("#employee-name").val().trim();
   role = $("#employee-role").val().trim();
   started = $("#date-started").val().trim();
   rate = $("#monthly-rate").val().trim();
   console.log("Employee Name: ", name, "Role: ", role, "Start Date: ",  started, "Rate: ", rate);
   // Code for handling the push
   database.ref().push({
     name: name,
     role: role,
     started: started,
     rate: rate,
     dateAdded: firebase.database.ServerValue.TIMESTAMP
   });
 });

 // Firebase watcher .on("child_added"
 database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
    // Console.logging the last user's data
    console.log(sv.name);
    console.log(sv.role);
    console.log(sv.started);
    console.log(sv.rate);
    // Change the HTML to reflect
    $("#name-display").text(sv.name);
    $("#role-display").text(sv.role);
    $("#started-display").text(sv.started);
    $("#rate-display").text(sv.rate);
    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });