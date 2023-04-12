import {ListPerson} from '../models/ListPerson.js';
import { Employee } from '../models/Employee.js';


document.getElementById('addEmp').onclick = () => {
    document.getElementById('btn-update').disabled = true;
    document.getElementById('btn-add').disabled = false;
    document.getElementById('id').disabled = false;
}

let listPerson = new ListPerson();
getArrEmployee();
renderTableEmployee(listPerson.arrPerson);

function renderTableEmployee(arrEmployee) {
    let htmlContent = '';
    for (let emp of arrEmployee) {
        let employee = new Employee();
        Object.assign(employee, emp);
        htmlContent += `
            <tr>
                <td>${employee.id}</td>
                <td>${employee.fullName}</td>
                <td>${employee.email}</td>
                <td>${employee.address}</td>
                <td>${employee.calculateSalary()}</td>
                <td>
                    <button class="btn btn-danger" onclick="removeEmployee('${employee.id}')">Xóa</button>

                    <button class="btn btn-primary mx-2" id="btn-fix" 
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal" onclick="fixEmployee('${employee.id}')">
                    Sửa
                    </button>
                </td>
            </tr>
        `
    }
    document.querySelector('#tbodyEmployee').innerHTML = htmlContent;
    return htmlContent;
}



document.querySelector('#btn-add').onclick = function () {
    var emp = new Employee();
    var arrInput = document.querySelectorAll('.modal-body input');
    for (let input of arrInput) {
        let { id, value } = input;
        emp[id] = value;
    }
    listPerson.addPerson(emp);
    renderTableEmployee(listPerson.arrPerson);
    saveEmployee();
}



window.removeEmployee = function (id) {
    listPerson.removePerson(id);
    renderTableEmployee(listPerson.arrPerson);
}

window.fixEmployee = function(id) {
    let empFix = listPerson.getInfoPerson(id);
    if (empFix) {
        var arrInput = document.querySelectorAll('.modal-body input');
        for(let input of arrInput) {
            let {id} = input;
            input.value = empFix[id]; 
        }
    }
    document.getElementById('id').disabled = true;
    document.getElementById('btn-add').disabled = true;
    document.getElementById('btn-update').disabled = false;
}

document.querySelector('#btn-update').onclick = function () {
    var empUpdate = new Employee();
    var arrInput = document.querySelectorAll('.modal-body input');
    for (let input of arrInput) {
        let { id, value } = input;
        empUpdate[id] = value;
    }
    listPerson.updatePerson(empUpdate);
    renderTableEmployee(listPerson.arrPerson);
    saveEmployee();
}


function saveEmployee() {
    let stringEmployee = JSON.stringify(listPerson.arrPerson);
    localStorage.setItem("arrEmployee", stringEmployee);
  }
  
  function getArrEmployee() {
    if (localStorage.getItem("arrEmployee")) {
      var stringEmployee = localStorage.getItem("arrEmployee");
      listPerson.arrPerson = JSON.parse(stringEmployee);
    }
  }