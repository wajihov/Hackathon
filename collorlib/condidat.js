function ajoutuser () {
    var tableau =JSON.parse(localStorage.getItem("tableau")) ; 
     
    if (tableau==null){
        tableau= [] ;
    }
var inff = {

           id: Math.floor(Math.random()*100000+1) ,
           fname: document.getElementById("name").value ,
           mail : document.getElementById("email").value ,
           password :document.getElementById("pass").value ,
           repass : document.getElementById("re_pass").value 
};




    tableau.push(inff);    
    
window.localStorage.setItem("tableau",JSON.stringify(tableau)) ;

reset() ; 
}

function reset() {

    fname=document.getElementById("name").value="";
    mail =document.getElementById("email").value="" ;
    password =document.getElementById("pass").value="" ;
    repass = document.getElementById("re_pass").value="" ;  

}



function login () {
    var listUser =JSON.parse(localStorage.getItem("tableau")) ;
    var userActif =JSON.parse(localStorage.getItem("actifUser"));
   if (listUser==null) {
       listUser=[] ; 
 }
   var login = document.getElementById("your_name").value  ; 
   var passs = document.getElementById("your_pass").value ; 
  
  
test=false ; 
for (i=0;i<listUser.length;i++) {

 if (listUser[i].mail==login && listUser[i].password==passs) {
      test=true ; 
// alert("Hello world ") ; 
     window.location.href="../dashboard.html";
      localStorage.setItem("actifUser", JSON.stringify(listUser[i].id)) ;

 }
   

}   
}





