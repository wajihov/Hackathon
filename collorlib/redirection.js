console.log("aads");
    
var userActif = JSON.parse(localStorage.getItem("actifUser"));

if (userActif == null) {
    window.location = "collorlib/singin.html";
}