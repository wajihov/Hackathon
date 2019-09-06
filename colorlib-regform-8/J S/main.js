(function($) {

    $(".toggle-password").click(function() {

        $(this).toggleClass("zmdi-eye zmdi-eye-off");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
          input.attr("type", "text");
        } else {
          input.attr("type", "password");
        }
      });

})(jQuery);

function verif() {
  var ch = document.getElementById("name").value;
  for (let i = 0; i < ch.length; i++) {

      if (ch[i] == ' ') {
          console.log("erreur");
          document.getElementById("name").style.backgroundColor = 'red';

      }
  }
}
function validation() {
  var expressionReguliere = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

  if (expressionReguliere.test(document.getElementById("email").value)) {
      document.getElementById("email").style.color = 'green';
  }
  else {

      document.getElementById("email").style.color = 'red';
  }
  return false;
}

function pswd() {
  var password = document.getElementById("password").value;
  if (password == '') { console.log('erreur'); }
  console.log("le pW : ", password);
  if (password.length < 8) {
      alert("invalid");
      return;
  }
  var pw = document.getElementById("password").value;
  console.log("Welcome : ");

  compteur = 0;
  if ((pw) == true)
      compteur++;
  if (majuscule(pw) == true)
      compteur++;
  if (minuscule(pw) == true)
      compteur++;
  if (PWisNumber(pw))
      compteur++;
  if (pw.length >= 8)
      compteur++;
  console.log(pw, " le compteur est : ", compteur);
  if (compteur > 3) {
      var msgMail2 = "le mot de passe fort";
      console.log(msgMail2);
      document.getElementById("RepPass2").innerHTML = msgMail2;
      document.getElementById("password").style.backgroundColor = "red";
  }

  else if (compteur == 2 || compteur == 3) {
      var msgMail2 = "le mot de passe moyenne";
      console.log(msgMail2);
      document.getElementById("RepPass2").innerHTML = msgMail2;
      document.getElementById("password").style.backgroundColor = "green";
  }

  else if (compteur == 1) {
      var msgMail2 = "le mot de passe faible";
      console.log(msgMail2);
      document.getElementById("RepPass2").innerHTML = msgMail2;
      document.getElementById("password").style.backgroundColor = "yellow";
  }

  function PWisNumber(pw) {
      var test = false;
      for (i = 0; i < pw.length; i++) {
          if (!isNaN(pw.charAt(i))) {           //if the string is a number, do the following
              test = true;
              break;
          }
      }
      if (test == true)
          return true;
      else
          return false;
  }
  function minuscule(pw) {
      var test = false;
      for (i = 0; i < pw.length; i++) {
          if (pw.charAt(i) === pw.charAt(i).toLowerCase()) {
              test = true;
              break;
          }
      }
      if (test == true)
          return true;
      else
          return false;
  }

  function majuscule(pw) {
      var test = false;
      for (i = 0; i < pw.length; i++) {
          if (pw.charAt(i) === pw.charAt(i).toUpperCase()) {
              test = true;
              break;
          }
      }
      if (test == true)
          return true;
      else
          return false;
  }

}

function validate() {

  var a = document.getElementById("password").value;
  var b = document.getElementById("re_password").value;

  if (a != b) {
      console.log("Les mots de passe ne correspondent pas.");
  }
  else {
      console.log("Les mots de passe correspondent.");
  }
}


function registre() {
  var tabuser = JSON.parse(localStorage.getItem('tabUser'))
  if (tabuser == null) {
      tabuser = []
  }
  var a = document.getElementById("name").value;

 
  var b = document.getElementById("email").value;
  
  var c = document.getElementById("password").value;


  var obj = {
      name: a,
      email: b,
      password: c,
      


  }
  tabuser.push(obj)
  var str = JSON.stringify(tabuser)
  localStorage.setItem('tabUser', str)

  console.log(str);}

  function login() {
    var tabUser = JSON.parse(localStorage.getItem('tabUser'))
    if (tabUser == null) {
        tabUser = []
    }
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;
    for (let i = 0; i < tabUser.length; i++) {
        if (tabUser[i].name == name && tabUser[i].password == password) {
             console.log("ok") 
             location.href = "file:///C:/Users/pc/Desktop/Projet%20JS/Hackathon/colorlib-regform-8/starter.html"
            }
        else
            console.log("erreur")
    }}