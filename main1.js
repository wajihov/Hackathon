function registre() {
    var tableau = JSON.parse(localStorage.getItem('tableau'))
    if (tableau == null) {
        tableau = []
    }
    console.log(tableau)}
function table() {
    for (let i = 0; i < tabTask.length; i++) {
        html += ` <tr>
             <td>${tabTask[i].id}</td>
             <td>${tabTask[i].fname}</td>
             <td>${tabTask[i].mail}</td>
             <td>${tabTask[i].password}</td>
             </tr>`}
             id=localStorage.getItem('id')}