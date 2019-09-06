function display(){
    document.getElementById('add').style.display = 'none';
    document.getElementById('table').style.display = 'block';
    document.getElementById('edit').style.display = 'none';
    displayTask();
}
function add() {
    document.getElementById('add').style.display = 'block';
    document.getElementById('table').style.display = 'none';
    document.getElementById('edit').style.display = 'none';
}
function addTask() {
    var tabTask = JSON.parse(localStorage.getItem('tabTask'))
    if (tabTask == null) {
        tabTask = []
    }
    var task = document.getElementById("task").value;
    var date = document.getElementById("date").value;
    var Quantité = document.getElementById("Quantité").value;
    var Prix = document.getElementById("Prix").value;
    var image = document.getElementById("img");


    const obj = {
        Id: Math.round(Math.random() * 1000),
        task: task,
        date: date,
        Quantité: Quantité,
        Prix: Prix,
        image: image.files[0].name
    }
    
    tabTask.push(obj);
    localStorage.setItem('tabTask', JSON.stringify(tabTask))

}
function displayTask() {
    var tabTask = JSON.parse(localStorage.getItem('tabTask'))
    if (tabTask == null) {
        tabTask = []
    }

    var html = `<br> <table border="1" style="height=30px">
    <tr>
        <td>Nom</td>
        <td>Description</td>
        <td>Quantité</td>
        <td>Prix</td>
        <td>image</td>
        <td>Action</td>
    </tr></br>`
    for (let i = 0; i < tabTask.length; i++) {
        html += ` <tr>
             <td>${tabTask[i].task}</td>
             <td>${tabTask[i].date}</td>
             <td>${tabTask[i].Quantité}</td>
             <td>${tabTask[i].Prix}</td>
             <td><img heigh ='300' width='400' src='C:/Users/pc/Desktop/table/image/${tabTask[i].image}'</td>
             <td><button onclick="deleteTask(${i})">Delete</button>
             <button onclick="Edit(${i})">Edit</button>
         </tr>`

    }
    html += `</table > `;
    document.getElementById('table').innerHTML = html
}
function deleteTask(index) {
    var tabTask = JSON.parse(localStorage.getItem('tabTask'))
    if (tabTask == null) {
        tabTask = []
    }
    tabTask.splice(index, 1)
    localStorage.setItem('tabTask', JSON.stringify(tabTask))
    displayTask()

}
function Edit(index) {
    var tabTask = JSON.parse(localStorage.getItem('tabTask'))
    if (tabTask == null) {
        tabTask = []
    }
    document.getElementById('edit').style.display = 'block';
    const todo = tabTask[index]

    document.getElementById('taskE').value = todo.task
    document.getElementById('dateE').value = todo.date
    document.getElementById('QuantitéE').value = todo.Quantité
    document.getElementById('PrixE').value = todo.Prix
    document.getElementById('imageE').value = todo.image
    document.getElementById('index').value = index


}
function SaveEdit() {
    var tabTask = JSON.parse(localStorage.getItem('tabTask'))
    if (tabTask == null) {
        tabTask = []
    }
    var todo = document.getElementById('taskE').value
    var date = document.getElementById('dateE').value
    var Quantité = document.getElementById('QuantitéE').value
    var Prix = document.getElementById('PrixE').value
    var image = document.getElementById('imageE').value
    var index = document.getElementById('index').value

    //methode 1 
    const task = {
        task : todo,
        date : date,
        Quantité : Quantité,
        Prix : Prix,
        image : image
    }
    tabTask.splice(index,1,task)

    //methode 2

    // tabTask[index].task = todo;
    // tabTask[index].date = date;






    localStorage.setItem('tabTask', JSON.stringify(tabTask))
    displayTask()
}
function annuler (){
    var tabTask = JSON.parse(localStorage.getItem('tabTask'))
    if (tabTask == null) {
        tabTask = []
    }
        document.getElementById('edit').style.display = 'none';
        localStorage.setItem('tabTask', JSON.stringify(tabTask))
        displayTask();}
