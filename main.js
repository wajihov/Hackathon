
/* function displayTask() {
    var tabTask = JSON.parse(localStorage.getItem('tabTask'))
    if (tabTask == null) {
        tabTask = []
    }

    var html = `<table border="0" style="width: 100%;"  >
    <tr>
        <td>Nom</td>
        <td>Description</td>
        <td>Quantité</td>
        <td>Prix</td>
        <td>image</td>
        
    </tr>`
    for (let i = 0; i < tabTask.length; i++) {
        html += ` <tr>
             <td>${tabTask[i].task}</td>
             <td>${tabTask[i].date}</td>
             <td>${tabTask[i].Quantité}</td>
             <td>${tabTask[i].Prix}</td>
             <td><img  src='C:/Users/pc/Desktop/table/image/${tabTask[i].image}'</td>
             
         </tr>`

    }
    html += `</table > `;
     document.getElementById('table').innerHTML = html 
    
} */
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
        <td>Image</td>
        
    </tr></br>`
    for (let i = 0; i < tabTask.length; i++) {
        html += ` <tr>
             <td>${tabTask[i].task}</td>
             <td>${tabTask[i].date}</td>
             <td>${tabTask[i].Quantité}</td>
             <td>${tabTask[i].Prix}</td>
             <td><img heigh ='150' width='150' src='C:/Users/pc/Desktop/table/image/${tabTask[i].image}'</td>
             
         </tr>`

    }
    html += `</table > `;
    document.getElementById('table').innerHTML = html
}