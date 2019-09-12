let d = new Date();
let ColorList = ['red', 'green', 'yellow', 'blue', 'orange']
let month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
// var month_name=['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'
// , 'Juillet', 'Aôut', 'September', 'October', 'November', 'Décember'];
let day_week = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
let month = d.getMonth();   //0-11
let year = d.getFullYear(); //2019
let activateDateToday;
let indexID = null;
window.onload = function () {
    actualize(month, year);
    refreshCalendar(month, year);
};

function clickAddEvent() {
    var tds = document.getElementsByTagName("td");
    for (var i in tds)
        tds[i].onclick = addEvent;
}

function addEvent() {
    table = document.getElementById("myTable");
    for (var i = 0; i < table.rows.length; i++) {
        for (var j = 0; j < table.rows[i].cells.length; j++)
            table.rows[i].cells[j].onclick = function () {
                getval(this);
            };
    }
}

function ajouterEvenement() {
    let dateDebut = document.getElementById("startDate").value;
    let dateFin = document.getElementById("endDate").value;

    if (dateFin < dateDebut) {
        let msg = "Date invalid";
        document.getElementById("error").innerHTML = msg;
        //document.getElementById("endDate").style.background = "rgb(248, 90, 90)";
        modal.style.display = "block";
    }
    else {
        //document.getElementById("error").innerHTML = "";
        console.log("L'index est : ", indexID);

        if (indexID == null) {
            console.log("Dans Ajouter Evenement");
            let listEven = JSON.parse(localStorage.getItem("MyEvents")) || [];
            let idSte = JSON.parse(localStorage.getItem("actifUser"));
            const evenement = {
                idSociete: idSte,
                idEvent: Math.random().toString(36).substr(2, 9),
                description: document.getElementById("txtDesc").value,
                dateDebut: document.getElementById("startDate").value,
                dateFin: document.getElementById("endDate").value,
                colorEvent: verifColor(dateDebut, dateFin)
            }
            listEven.push(evenement);
            localStorage.setItem("MyEvents", JSON.stringify(listEven));
        }

        else if (indexID != null) {
            let listEven = JSON.parse(localStorage.getItem("MyEvents"));
            let idSte = JSON.parse(localStorage.getItem("actifUser"));
            for (e = 0; e < listEven.length; e++) {
                if (listEven[e].idEvent == indexID) {
                    const evenement = {
                        idSociete: idSte,
                        idEvent: indexID,
                        description: document.getElementById("txtDesc").value,
                        dateDebut: document.getElementById("startDate").value,
                        dateFin: document.getElementById("endDate").value,
                        colorEvent: listEven[e].colorEvent
                    }
                    listEven[e] = evenement;
                    break;
                }
            }
            localStorage.setItem("MyEvents", JSON.stringify(listEven));
            returnAddEvent();
        }
        indexID = null;
        document.getElementById("save").innerHTML = "Save";
    }
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    resetModal();
    refreshCalendar(month, year);
};


function returnAddEvent() {
    document.getElementById("save").innerHTML = "Save";
    indexID = null;
    //document.getElementById("delete").style.display = "none";
}

function verifColor(debut, fin) {
    console.log("debut ", colorEvent(debut), " ", colorEvent(fin));
    let listEven = JSON.parse(localStorage.getItem("MyEvents"));
    colorChoisi = ColorList[Math.floor(Math.random() * ColorList.length)];
    if (listEven != null) {
        for (e = 0; e < listEven.length; e++) {
            if (colorEvent(fin).m == colorEvent(listEven[e].dateDebut).m
                && colorEvent(fin).a == colorEvent(listEven[e].dateDebut).a) {
                console.log("La date est ", e, " ", listEven[e]);
                while (listEven[e].colorEvent == colorChoisi) {
                    colorChoisi = ColorList[Math.floor(Math.random() * ColorList.length)];
                }
            }
        }
    }
    return colorChoisi;
}

function insertTableEvent(mois, annee) {
    removeTable();
    let afficheEventTable = JSON.parse(localStorage.getItem("MyEvents"));
    if (afficheEventTable == null) {
        document.getElementById("EventTableList").style.display = "none";
    }
    else {
        document.getElementById("EventTableList").style.display = "block";
        // console.log("La taille : ", afficheEventTable.length);
        // let table = document.getElementById("Entete");
        // let row = table.insertRow(table.length);
        // let th1 = row.insertCell(0);
        // th1.innerHTML = "Description";
        // let th2 = row.insertCell(1);
        // th2.innerHTML = "Date debut";
        // let th3 = row.insertCell(2);
        // th3.innerHTML = "Date Fin";
        for (e = 0; e < afficheEventTable.length; e++) {
            if (mois == colorEvent(afficheEventTable[e].dateDebut).m
                && annee == colorEvent(afficheEventTable[e].dateDebut).a) {
                let table = document.getElementById("EventTableList");
                let row = table.insertRow(table.length);
                let cell1 = row.insertCell(0);
                cell1.innerHTML = afficheEventTable[e].description;
                let cell2 = row.insertCell(1);
                cell2.innerHTML = afficheEventTable[e].dateDebut;
                let cell3 = row.insertCell(2);
                cell3.innerHTML = afficheEventTable[e].dateFin;
            }
            // let cell2 = row.insertCell(1);
            // cell2.innerHTML = afficheEventTable[e].colorEvent;
        }
    }
}


function getval(cel) {

    let listEvent = JSON.parse(localStorage.getItem("MyEvents"));
    let dtDebut;
    let dtFin;
    let desc;

    if (listEvent != null) {
        for (e = 0; e < listEvent.length; e++) {
            if (colorEvent(listEvent[e].dateDebut).m == month && colorEvent(listEvent[e].dateDebut).a == year) {
                if (colorEvent(listEvent[e].dateDebut).j <= parseInt(cel.innerHTML) &&
                    colorEvent(listEvent[e].dateFin).j >= parseInt(cel.innerHTML)) {
                    console.log("Existe");
                    indexID = listEvent[e].idEvent;
                    dtDebut = listEvent[e].dateDebut;
                    dtFin = listEvent[e].dateFin;
                    desc = listEvent[e].description;
                }
            }
        }
    }
    month += 1;
    let selectDate;
    let dateFin;
    if (month < 10) {
        month = '0' + month.toString();
    }
    let day = cel.innerHTML
    if (day < 10) {
        day = '0' + day.toString();
    }
    if (indexID != null) {
        document.getElementById('txtDesc').value = desc;
        document.getElementById('startDate').value = dtDebut;
        document.getElementById('endDate').value = dtFin;
        document.getElementById("save").innerHTML = "Mettre à jours";
        document.getElementById('addButton').innerHTML =
            '<button type="button" class="btn btn-primary" id="delete" onclick="SupprimerEvenement(`${indexID}`)">Delete</button>'
    }
    else {
        selectDate = year + "-" + month + "-" + day;
        document.getElementById('startDate').value = selectDate;
        document.getElementById("save").innerHTML = "Save";
    }

    month -= 1;
    var modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // if (span != null) {
    //     indexID = null;
    // }

    // When the user clicks the button, open the modal 
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        resetModal();
        indexID = null;
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function SupprimerEvenement(indexID) {
    let listEven = JSON.parse(localStorage.getItem("MyEvents"));
    if (confirm("Are you sure to delete this Event?")) {
        for (e = 0; e < listEven.length; e++) {
            if (listEven[e].idEvent==indexID) {
                listEven.splice(e, 1);
                break;
            }
        }
        localStorage.setItem("MyEvents", JSON.stringify(listEven));
    }
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
    resetModal();
    refreshCalendar(month, year);
    
}

function resetModal() {
    document.getElementById("txtDesc").value = "";
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";    
    indexID == null;
    document.getElementById("save").innerHTML = "Save";    
    document.getElementById('addButton').innerHTML="";
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
    let dateEvent = new Date(datEvt);
    let j = dateEvent.getDate();
    let m = dateEvent.getMonth();
    let a = dateEvent.getFullYear();
    return { j, m, a };
}

function get_calendar(day_no, days, activateDateToday, mois, annee) {
    var todaysDate;
    let listEven = JSON.parse(localStorage.getItem("MyEvents"));
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
        let td = document.createElement('td');
        td.innerHTML = "";
        tr.appendChild(td);
    }
    var count = 1;
    for (; c <= 6; c++) {
        var td = document.createElement('td');
        if (count == todaysDate) {
            td.className = 'today';
        }
        for (e in listEven) {
            if (colorEvent(listEven[e].dateDebut).m == mois && colorEvent(listEven[e].dateDebut).a == annee &&
                colorEvent(listEven[e].dateFin).m == mois && colorEvent(listEven[e].dateFin).a == annee) {
                for (i = colorEvent(listEven[e].dateDebut).j; i <= colorEvent(listEven[e].dateFin).j; i++)
                    if (count == i) {
                        let c = listEven[e].colorEvent;
                        //td.className = "eventDate";
                        switch (c) {
                            case 'orange':
                                td.className = 'eventDateOrange'
                                break;
                            case 'yellow':
                                td.className = 'eventDateYellow'
                                break;
                            case 'green':
                                td.className = 'eventDateGreen'
                                break;
                            case 'blue':
                                td.className = 'eventDateBlue'
                                break;
                            case 'red':
                                td.className = 'eventDateRed'
                                break;
                            default:
                                break;
                        }
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

            for (e in listEven) {
                if (colorEvent(listEven[e].dateDebut).m == mois && colorEvent(listEven[e].dateDebut).a == annee &&
                    colorEvent(listEven[e].dateFin).m == mois && colorEvent(listEven[e].dateFin).a == annee) {
                    for (i = colorEvent(listEven[e].dateDebut).j; i <= colorEvent(listEven[e].dateFin).j; i++)
                        if (count == i) {
                            let c = listEven[e].colorEvent;
                            switch (c) {
                                case 'orange':
                                    td.className = 'eventDateOrange';
                                    break;
                                case 'yellow':
                                    td.className = 'eventDateYellow';
                                    break;
                                case 'green':
                                    td.className = 'eventDateGreen';
                                    break;
                                case 'blue':
                                    td.className = 'eventDateBlue';
                                    break;
                                case 'red':
                                    td.className = 'eventDateRed';
                                    break;
                                default:
                                    break;
                            }
                            // td.className = "eventDate";
                            //document.getElementsByClassName("eventDate").style.background= "red";
                            // td.setProperty("background-color", "yellow");
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

// function randomColor() {
//     color = 'rgb(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ')';
//     return color;
// }

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
    insertTableEvent(month, year);
}

function removeTable() {
    let tableHeaderRowCount = 0;
    let table = document.getElementById('EventTableList');
    let rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
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