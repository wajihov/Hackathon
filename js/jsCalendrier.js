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
let event;

window.onload = function () {
    actualize(month, year);
    refreshCalendar(month, year);
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

    console.log("Helooo");

    let dateDebut = document.getElementById("startDate").value;
    let dateFin = document.getElementById("endDate").value;

    if (dateFin < dateDebut) {
        let msg = "Date invalid";
        document.getElementById("error").innerHTML = msg;
        //document.getElementById("endDate").style.background = "rgb(248, 90, 90)";
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
            dateFin: document.getElementById("endDate").value,
            colorEvent: verifColor(dateDebut, dateFin)
        }
        listEven.push(evenement);
        localStorage.setItem("MyEvents", JSON.stringify(listEven));
    }
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    resetModal();
    refreshCalendar(month, year);
};

function verifColor(debut, fin) {

    console.log("debut ", colorEvent(debut), " ", colorEvent(fin));

    let moiS = colorEvent(debut).m;
    let anneE = colorEvent(debut).a;
    let moiS2 = colorEvent(fin).m;
    let anneE2 = colorEvent(fin).a;
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

function getval(cel) {
    month += 1;
    if (month < 10) {
        month = '0' + month.toString();
    }
    let day = cel.innerHTML
    if (day < 10) {
        day = '0' + day.toString();
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
    let dateEvent = new Date(datEvt);
    let j = dateEvent.getDate();
    let m = dateEvent.getMonth();
    let a = dateEvent.getFullYear();
    return { j, m, a };
}


function get_calendar(day_no, days, activateDateToday, mois, annee) {
    var todaysDate;
    // var colorDay = [colorEvent("september , 2019 12"), colorEvent("september , 2019 21"),
    // colorEvent("september , 2019 1"), colorEvent("september , 2019 25"), colorEvent("August , 2019 29")
    //     , colorEvent("October , 2019 22"), colorEvent("january , 2019 10"), colorEvent("November , 2019 30")
    //     , colorEvent("November , 2019 4")];

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
        var td = document.createElement('td');
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
                        //td.className = td.className===color;
                        //  td.className = randomColor();
                        //  console.log("La couleur 2 ", color);
                        // td.className = get_random_color2();
                    }
                // if (count == colorEvent(listEven[e].dateDebut).j && count == colorEvent(listEven[e].dateFin).j) {
                //     td.className = "eventDate";
                // }
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


                            //td.style = c;
                            //document.getElementsByClassName("eventDate").style.color=c;

                            //table.setAttribute("id", "myTable");
                            //td.setAttribute("eventDate", );
                            if (document.getElementsByClassName("eventDate")) {
                                //console.log("JJJJJJJJJJJJJJJJJJJJJJJJJJ");
                                // var td = document.styleSheets[0].cssRules[0].style;
                                // td.setProperty("background-color", "yellow");


                                //document.getElementsByClassName("eventDate").style.background = c;
                                //document.getElementsByClassName("eventDate").style.background = c;
                            }



                            //document.getElementsByName("eventDate").style.backgroundColor = c;


                            //td.className = td.className===color;
                            //document.getElementById("eventDate").style.backgroundColor = color
                            //td.className = color;
                            //td.className = randomColor();
                            //console.log("La couleur 3 ", color);

                            // let color = get_random_color2();
                            // console.log("la couleur est : ", color);

                            // td.className = color;

                        }
                    // if (count == colorEvent(listEven[e].dateDebut).j && count == colorEvent(listEven[e].dateFin).j) {
                    //     td.className = "eventDate";
                    // }
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

// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

// function setRandomColor() {
//     // $("#colorpad").css("background-color", getRandomColor());
//     // Math.pow is slow, use constant instead.
//     var color = Math.floor(Math.random() * 16777216).toString(16);
//     // Avoid loops.
//     return '#000000'.slice(0, -color.length) + color;
// }

// function get_random_color2() {
//     var r = function () { return Math.floor(Math.random() * 256) };
//     return "rgb(" + r() + "," + r() + "," + r() + ")";
// }

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