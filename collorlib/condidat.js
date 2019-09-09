// inscription condidat  ........

function ajoutuser() {
    var tableau = JSON.parse(localStorage.getItem("tableau"));

    if (tableau == null) {
        tableau = [];
    }
    var inff = {

        id: Math.floor(Math.random() * 100000 + 1),
        fname: document.getElementById("name").value,
        mail: document.getElementById("email").value,
        password: document.getElementById("pass").value,
        repass: document.getElementById("re_pass").value
    };
    verif_pass();

    tableau.push(inff);

    window.localStorage.setItem("tableau", JSON.stringify(tableau));

    // verification de mot de passe ....

    function verif_pass() {
        var a = document.getElementById("pass").value;
        var b = document.getElementById("re_pass").value;

        if (a != b) {
            document.getElementById("eror").innerHTML = "Error !! verifiez votre mot de passe";
        }
    }

}


function verif_pass2() {
    var c = document.getElementById("pass2").value;
    var d = document.getElementById("re_pass2").value;

    if (c != d) {
        document.getElementById("eror2").innerHTML = "Error !! verifiez votre mot de passe";
    }
}





// reset input after create an account ....

function reset() {
    name = document.getElementById("name").value = "";
    mail = document.getElementById("email").value = "";
    password = document.getElementById("pass").value = "";
    repass = document.getElementById("re_pass").value = "";

}


// Inscription sociètè ...document.....

function ajout_soc() {
    var tableau = JSON.parse(localStorage.getItem("tableau"));

    if (tableau == null) {
        tableau = [];
    }
    var inff = {

        id: Math.floor(Math.random() * 100000 + 1),
        name: document.getElementById("name2").value,
        mail: document.getElementById("email2").value,
        password: document.getElementById("adress").value,
        repass: document.getElementById("phone").value,
        repass: document.getElementById("pass2").value,
        repass: document.getElementById("re_pass2").value

    };

    verif_pass2();
    tableau.push(inff);

    window.localStorage.setItem("tableau", JSON.stringify(tableau));

    reset2();
}

// reset input after create an account ....


function reset2() {
    name = document.getElementById("name2").value = "";
    mail = document.getElementById("email2").value = "";
    password = document.getElementById("adress").value = "";
    repass = document.getElementById("phone").value = "";
    repass = document.getElementById("pass2").value = "";
    repass = document.getElementById("re_pass2").value = "";


}




function login2() {
    var listUser = JSON.parse(localStorage.getItem("tableau"));
    var userActif = JSON.parse(localStorage.getItem("actifUser"));
    if (listUser == null) {

        listUser = [];
    }
    var login = document.getElementById("your_name2").value;
    var passs = document.getElementById("your_pass2").value;


    test = false;
    for (i = 0; i < listUser.length; i++) {

        if (listUser[i].mail == login && listUser[i].password == passs) {
            test = true;
            // alert("Hello world ") ; 
            window.location.href = "../dashboardS.html";
            localStorage.setItem("actifUser", JSON.stringify(listUser[i].id));
        }

    }
}

// Login condidat ...

function login() {
    var listUser = JSON.parse(localStorage.getItem("tableau"));
    var userActif = JSON.parse(localStorage.getItem("actifUser"));
    if (listUser == null) {

        listUser = [];
    }
    var login = document.getElementById("your_name").value;
    var passs = document.getElementById("your_pass").value;


    test = false;
    for (i = 0; i < listUser.length; i++) {

        if (listUser[i].mail == login && listUser[i].password == passs) {
            test = true;
            // alert("Hello world ") ; 
            window.location.href = "../dashboard.html";
            localStorage.setItem("actifUser", JSON.stringify(listUser[i].id));
        }

    }
}

// logout condidat & sociètè ....

function logout() {

    var actifUser = JSON.parse(localStorage.getItem("actifUser"));
    localStorage.removeItem('actifUser');
    window.location = "index.html";

}


function redirection() {
    console.log("aads");
    
    var userActif = JSON.parse(localStorage.getItem("actifUser"));
    
    if (userActif == null) {
        window.location = "collorlib/singin.html";
    }
}



