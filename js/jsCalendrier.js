var d = new Date();
var month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
// var month_name=['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'
// , 'Juillet', 'Aôut', 'September', 'October', 'November', 'Décember'];
var day_week = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
var month = d.getMonth();   //0-11
var year = d.getFullYear(); //2019
let activateDateToday;
let event;

window.onload = function () {
    actualize(month, year);
    refreshCalendar(month, year);
    let listEven = JSON.parse(localStorage.getItem("MyEvents"));

    if (listEven != null) {
        for (item in listEven) {
            // console.log(listEven[item].idEvent, " / ", listEven[item].dateDebut, " / ", listEven[item].dateFin);
            if (listEven[item].dateDebut) {
                //document.getElementById("myTable").rows[0].cells[0].innerHTML = "*";
            }
        }
    }
};



function clickAddEvent() {
    var tds = document.getElementsByTagName("td");
    for (var i in tds) tds[i].onclick = addEvent;
}

function addEvent() {
    table = document.getElementById("myTable");
    for (var i = 0; i < table.rows.length; i++) {
        for (var j = 0; j < table.rows[i].cells.length; j++)
            table.rows[i].cells[j].onclick = function () { getval(this); };
    }
}

function ajouterEvenement() {
    let dateDebut = document.getElementById("startDate").value;
    let dateFin = document.getElementById("endDate").value;
    if (dateFin < dateDebut) {
        let msg = "Date invalid";
        document.getElementById("error").innerHTML = msg;
        document.getElementById("endDate").style.background = "rgb(248, 90, 90)";
        modal.style.display = "block";
    }
    else {
        document.getElementById("error").innerHTML = "";
        let listEven = JSON.parse(localStorage.getItem("MyEvents")) || [];
        let idSte = JSON.parse(localStorage.getItem("actifUser"));
        const evenement = {
            idSociete: idSte,
            idEvent: Math.random().toString(36).substr(2, 9),
            description: document.getElementById("txtDesc").value,
            dateDebut: document.getElementById("startDate").value,
            dateFin: document.getElementById("endDate").value
        }
        listEven.push(evenement);
        localStorage.setItem("MyEvents", JSON.stringify(listEven));
    }
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    resetModal();
};

function getval(cel) {
    month += 1;
    if (month < 10) {
        month = '0' + month.toString()
        console.log(month);
    }
    let day = cel.innerHTML
    if (day < 10) {
        day = '0' + day.toString()
        console.log(day);
    }
    let selectDate = year + "-" + month + "-" + day;

    month -= 1;
    var modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the modal 
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        resetModal();
    }
    console.log(selectDate);

    document.getElementById('startDate').value = selectDate;

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function resetModal() {
    document.getElementById("txtDesc").value = "";
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
}

function todayDay(month, year) {
    if (month == d.getMonth() && year == d.getFullYear())
        activateDateToday = true;
    else
        activateDateToday = false;
    return activateDateToday;
}

function actualize(month, year) {
    let first_date = month_name[month] + " " + 1 + " " + year;
    //Auguest 1 2019
    let tmp = new Date(first_date).toDateString();
    //Thu Aout 01 2019 
    let first_day = tmp.substring(0, 3);    //Thu
    let day_name = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let day_no = day_name.indexOf(first_day);   //3
    let days = new Date(year, month + 1, 0).getDate();    //31
    //Thu Aout 31 2019 ...
    return { first_date, first_day, day_name, day_no, days, month, year };
}

function colorEvent(datEvt) {
    console.log("La date est : ", datEvt);
    let dateEvent = new Date(datEvt);
    let j = dateEvent.getDate();
    let m = dateEvent.getMonth();
    let a = dateEvent.getFullYear();
    return { j, m, a };
}
function get_calendar(day_no, days, activateDateToday, mois, annee) {
    var todaysDate;
    var colorDay = [colorEvent("september , 2019 12"), colorEvent("september , 2019 21"),
    colorEvent("september , 2019 1"), colorEvent("september , 2019 25"), colorEvent("August , 2019 29")
        , colorEvent("October , 2019 22"), colorEvent("january , 2019 10"), colorEvent("November , 2019 30")
        , colorEvent("November , 2019 4")];

    let listEven = JSON.parse(localStorage.getItem("MyEvents"));

    console.log("La liste est ", listEven);
    for (item in listEven) {
        console.log("date debut ", colorEvent(listEven[item].dateDebut).a, " / ",
            colorEvent(listEven[item].dateDebut).m, " / ", colorEvent(listEven[item].dateDebut).j, " ",
            listEven[item].dateFin);

    }


    if (listEven != null) {
        for (item in listEven) {
            // console.log(listEven[item].idEvent, " / ", listEven[item].dateDebut, " / ", listEven[item].dateFin);
            if (listEven[item].dateDebut) {
                //document.getElementById("myTable").rows[0].cells[0].innerHTML = "*";
            }
        }
    }



    console.log("le mois ", mois, " / ", annee);

    if (activateDateToday == true) {
        todaysDate = new Date().getDate();
    }

    var table = document.createElement('table');
    table.setAttribute("id", "myTable");
    var tr = document.createElement('tr');

    for (var c = 0; c < day_week.length; c++) {
        var th = document.createElement('th');
        th.innerHTML = day_week[c];
        tr.appendChild(th);
    }
    tr.appendChild(th);
    table.appendChild(tr);

    //create 2nd row
    tr = document.createElement('tr');
    var c;
    for (c = 0; c <= 6; c++) {
        if (c == day_no) {
            break;
        }
        var td = document.createElement('td');
        td.innerHTML = "";
        tr.appendChild(td);
    }
    var count = 1;
    var countEven = 1;
    for (; c <= 6; c++) {
        var td = document.createElement('td');
        if (count == todaysDate) {
            td.className = 'today';
        }
        for (i in colorDay) {
            let jour;
            if (colorDay[i].m == mois && colorDay[i].a == annee) {
                jour = colorDay[i].j;
                if (count == jour) {
                    td.className = "eventDate";
                }
            }
        }
        td.innerHTML = count;
        count++;
        tr.appendChild(td);
    }
    table.appendChild(tr);

    //rest of the date rows
    for (var r = 3; r <= 7; r++) {
        tr = document.createElement('tr');
        for (var c = 0; c <= 6; c++) {
            if (count > days) {
                table.appendChild(tr);
                return table;
            }
            var td = document.createElement('td');
            if (count == todaysDate) {
                td.className = 'today';
            }
            for (i in colorDay) {
                let jour;
                if (colorDay[i].m == mois && colorDay[i].a == annee) {
                    jour = colorDay[i].j;
                    if (count == jour) {
                        td.className = "eventDate";
                    }
                }
            }
            td.innerHTML = count;
            count++;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}

function refreshCalendar(month, year) {
    let listCalendar = actualize(month, year);
    activateDateToday = todayDay(month, year);
    let calendar = get_calendar(listCalendar.day_no, listCalendar.days, activateDateToday,
        listCalendar.month, listCalendar.year);
    let tbl = document.getElementById('calendar-dates');
    tbl.innerHTML = "";
    document.getElementById("calendar-month-year").innerHTML = month_name[month] + " " + year;
    document.getElementById("calendar-dates").appendChild(calendar);
    clickAddEvent();
}

function next() {
    year = (month === 11) ? year + 1 : year;
    month = (month + 1) % 12;
    refreshCalendar(month, year);
}

function previous() {
    year = (month === 11) ? year - 1 : year;
    if (month - 1 == -1) {
        month = 11;
    }
    else
        month = (month - 1) % 12;
    refreshCalendar(month, year);
}
function previousYear() {
    year = year - 1;
    if (month - 1 == -1) {
        month = 11;
    }
    refreshCalendar(month, year);
}
function nextYear() {
    year = year + 1;
    month = month % 12;
    refreshCalendar(month, year);
}