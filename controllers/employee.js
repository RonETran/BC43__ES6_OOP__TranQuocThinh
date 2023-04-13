import { ListPerson } from "../models/ListPerson.js";
import { Employee } from "../models/Employee.js";
import { Validation } from "../util/Validation.js";

document.getElementById("addEmp").onclick = () => {
  document.getElementById("btn-update").disabled = true;
  document.getElementById("btn-add").disabled = false;
  document.getElementById("id").disabled = false;
};

let listPerson = new ListPerson();
getArrEmployee();
renderTableEmployee(listPerson.arrPerson);

function renderTableEmployee(arrEmployee) {
  let htmlContent = "";
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
                    <button class="btn btn-danger" onclick="removeEmployee('${
                      employee.id
                    }')">Xóa</button>

                    <button class="btn btn-primary mx-2" id="btn-fix" 
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal" onclick="fixEmployee('${
                      employee.id
                    }')">
                    Sửa
                    </button>
                </td>
            </tr>
        `;
  }
  document.querySelector("#tbodyEmployee").innerHTML = htmlContent;
  return htmlContent;
}

document.querySelector("#btn-add").onclick = function () {
  var emp = new Employee();
  let check = new Validation();
  var arrInput = document.querySelectorAll(".modal-body input");
  for (let input of arrInput) {
    let { id, value } = input;
    emp[id] = value;
  }
  var valid = true;
  valid =
    check.kiemTraRong(emp.id, "error-id", "Mã") &
    check.kiemTraRong(emp.fullName, "error-name", "Tên") &
    check.kiemTraRong(emp.email, "error-email", "Email") &
    check.kiemTraRong(emp.address, "error-address", "Địa chỉ") &
    check.kiemTraRong(emp.daysOfWork, "error-days", "Số ngày làm") &
    check.kiemTraRong(emp.dailySalary, "error-salary", "Lương");

  valid =
    check.kiemTraSo(emp.id, "error-id-1", "Mã") &
    check.kiemTraSo(emp.daysOfWork, "error-days-1", "Số ngày làm") &
    check.kiemTraSo(emp.dailySalary, "error-salary-1", "Lương");
  valid = check.kiemTraKyTu(emp.fullName, "error-name-1", "Tên");
  valid = check.kiemTraEmail(emp.email, "error-email-1", "Email");
  valid = checkId();

  if (!valid) {
    return;
  }
  listPerson.addPerson(emp);
  renderTableEmployee(listPerson.arrPerson);
  saveEmployee();

  var clearInput = document.querySelectorAll(".modal-body input");
  for (let input of clearInput) {
    input.value = "";
  }

  document.querySelector("button[data-bs-dismiss]").click();
};

window.removeEmployee = function (id) {
  listPerson.removePerson(id);
  renderTableEmployee(listPerson.arrPerson);
};

window.fixEmployee = function (id) {
  let empFix = listPerson.getInfoPerson(id);
  if (empFix) {
    var arrInput = document.querySelectorAll(".modal-body input");
    for (let input of arrInput) {
      let { id } = input;
      input.value = empFix[id];
    }
  }
  document.getElementById("id").disabled = true;
  document.getElementById("btn-add").disabled = true;
  document.getElementById("btn-update").disabled = false;
};

document.querySelector("#btn-update").onclick = function () {
  var empUpdate = new Employee();
  let check = new Validation();

  var arrInput = document.querySelectorAll(".modal-body input");
  for (let input of arrInput) {
    let { id, value } = input;
    empUpdate[id] = value;
  }

  var valid = true;
  valid =
    check.kiemTraRong(empUpdate.id, "error-id", "Mã") &
    check.kiemTraRong(empUpdate.fullName, "error-name", "Tên") &
    check.kiemTraRong(empUpdate.email, "error-email", "Email") &
    check.kiemTraRong(empUpdate.address, "error-address", "Địa chỉ") &
    check.kiemTraRong(empUpdate.daysOfWork, "error-days", "Số ngày làm") &
    check.kiemTraRong(empUpdate.dailySalary, "error-salary", "Lương");

  valid =
    check.kiemTraSo(empUpdate.id, "error-id-1", "Mã") &
    check.kiemTraSo(empUpdate.daysOfWork, "error-days-1", "Số ngày làm") &
    check.kiemTraSo(empUpdate.dailySalary, "error-salary-1", "Lương");
  valid = check.kiemTraKyTu(empUpdate.fullName, "error-name-1", "Tên");
  valid = check.kiemTraEmail(empUpdate.email, "error-email-1", "Email");

  if (!valid) {
    return;
  }

  listPerson.updatePerson(empUpdate);
  renderTableEmployee(listPerson.arrPerson);
  saveEmployee();

  var clearInput = document.querySelectorAll(".modal-body input");
  for (let input of clearInput) {
    input.value = "";
  }

  document.querySelector("button[data-bs-dismiss]").click();
};

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

function checkId() {
  var valid = true;
  var stringEmp = localStorage.getItem('arrEmployee');
  var emp = JSON.parse(stringEmp);
  var input = document.getElementById('id').value;
  for(let i of emp){
    if(input === i.id || input === '') {
      return false;
    }
  }
  return valid;
}
