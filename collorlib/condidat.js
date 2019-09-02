function ajoutuser () {
    var tableau =JSON.parse(localStorage.getItem("tableau")) ; 
     
    if (tableau==null){
        tableau= [] ;
    }
var inff = {

    
           id: Math.floor(Math.random()*100000+1) ,
           fname: document.getElementById("name").value ,
           email : document.getElementById("email").value ,
           password :document.getElementById("pass").value ,
           repass : document.getElementById("re_pass").value 
};


if (tableau[i].repass)

    tableau.push(inff);    
    
window.localStorage.setItem("tableau",JSON.stringify(tableau)) ;

}




// function log () {
//     var listuser =JSON.parse(localStorage.getItem("tab")) 
//     var useractif =JSON.parse(localStorage.getItem("useractif")) 
//    if (listuser==null) {
//        listuser=[] ; 
//  }
//    var mail = document.getElementById("mail").value  ; 
//    var password = document.getElementById("pass").value ; 
  
  
// test=false ; 
// for (i=0;i<listlog.length;i++) {
 

//  if (listuser[i].email==mail && listuser[i].password==password) {
//       test=true ; 
//       alert("hello world");
//       localStorage.setItem("useractif", JSON.stringify(listuser[i].id)) ;
 
//  }
// if (test==false) {
// document.getElementById("errorlogin").innerHTML="Verifiez vos cordonnèes" ; 
// }   

