var d = new Date();
var month_name = ['January','February','March','April','May','June','July',
'August','September','October','November','December'];
// var month_name=['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'
// , 'Juillet', 'Aôut', 'September', 'October', 'November', 'Décember'];
var day_week=["Lun","Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
var month = d.getMonth();   //0-11
var year = d.getFullYear(); //2019
let activateDateToday;
let event;
window.onload = function(){

var result=actualize(month,year);
activateDateToday= todayDay(month,year);    
var calendar = get_calendar(result.day_no, result.days,activateDateToday);    
document.getElementById("calendar-month-year").innerHTML = month_name[month]+" "+year;
document.getElementById("calendar-dates").appendChild(calendar);    
clickAddEvent();
};

function clickAddEvent(){
var tds = document.getElementsByTagName("td");
for(var i in tds) tds[i].onclick = addEvent;
}

function addEvent() {
table= document.getElementById("myTable");
for (var i = 0; i < table.rows.length; i++) {
    for (var j = 0; j < table.rows[i].cells.length; j++)
        table.rows[i].cells[j].onclick = function () { getval(this); };
}
}

function getval(cel) {

/*console.log("cel ", cel.innerHTML);
event= prompt("Donner l'evenement : ");
var text = document.createTextNode(event);

console.log("text ", text);
console.log("cel ", cel);

cel.appendChild(text);
//alert(cel.innerHTML);*/
// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 

modal.style.display = "block";


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
modal.style.display = "none";
}
}
}

function todayDay(month,year){    
if(month==d.getMonth() && year==d.getFullYear())
    activateDateToday=true;
else 
    activateDateToday= false;    
return activateDateToday;
}

function actualize(month,year){
let first_date = month_name[month] + " " + 1 + " " + year;
//Auguest 1 2019
let tmp = new Date(first_date).toDateString();
//Thu Aout 01 2019 
let first_day = tmp.substring(0, 3);    //Thu
let day_name = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
let day_no = day_name.indexOf(first_day);   //3
let days = new Date(year, month+1, 0).getDate();    //31
//Thu Aout 31 2019 ...
return {first_date,first_day, day_name, day_no, days};
}

function get_calendar(day_no, days,activateDateToday){
var todaysDate ;
if(activateDateToday==true){
    todaysDate= new Date().getDate();
}    
var table = document.createElement('table');
table.setAttribute("id", "myTable");
var tr = document.createElement('tr');

for(var c=0; c<day_week.length;c++){
    var th= document.createElement('th');
    th.innerHTML=day_week[c];
    tr.appendChild(th);
}     
tr.appendChild(th);
table.appendChild(tr);

//create 2nd row
tr = document.createElement('tr');
var c;
for(c=0; c<=6; c++){
    if(c == day_no){
        break;
    }
    var td = document.createElement('td');
    td.innerHTML = "";
    tr.appendChild(td);
}

var count = 1;
for(; c<=6; c++){        
    var td = document.createElement('td');
    if (count == todaysDate) {
        td.className = 'today';
      }
    td.innerHTML = count;
    count++;
    tr.appendChild(td);
}
table.appendChild(tr);

//rest of the date rows
for(var r=3; r<=7; r++){
    tr = document.createElement('tr');
    for(var c=0; c<=6; c++){
        if(count > days){
            table.appendChild(tr);
            return table;
        }
        var td = document.createElement('td');
        if (count == todaysDate) {
            td.className = 'today';
        }
        td.innerHTML = count;
        count++;
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
return table;
}

function next() {
year = (month === 11) ? year + 1 : year;
month = (month + 1) % 12;

let listCalendar= actualize(month, year);
activateDateToday= todayDay(month,year);
let calendar = get_calendar(listCalendar.day_no, listCalendar.days , activateDateToday);
let tbl=document.getElementById('calendar-dates');
tbl.innerHTML="";    
document.getElementById("calendar-month-year").innerHTML=month_name[month]+ " "+ year;
document.getElementById("calendar-dates").appendChild(calendar); 
clickAddEvent();
}

function previous() {
year = (month === 11) ? year - 1 : year;
if(month-1==-1){
    month=11;
}
else
    month = (month - 1) % 12;

let listCalendar= actualize(month, year);
activateDateToday= todayDay(month,year);    
let calendar = get_calendar(listCalendar.day_no, listCalendar.days, activateDateToday);
let tbl=document.getElementById('calendar-dates');
tbl.innerHTML="";
document.getElementById("calendar-month-year").innerHTML=month_name[month]+ " "+ year;
document.getElementById("calendar-dates").appendChild(calendar); 
clickAddEvent();
}