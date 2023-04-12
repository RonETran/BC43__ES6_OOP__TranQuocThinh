import { ListPerson } from "../models/ListPerson.js";
import { Student } from "../models/Student.js";

document.getElementById("addStu").onclick = () => {
  document.getElementById("btn-update").disabled = true;
  document.getElementById("btn-add").disabled = false;
  document.getElementById("id").disabled = false;
};

let listPerson = new ListPerson();
getArrStudent();
renderTableStudent(listPerson.arrPerson);

function renderTableStudent(arrStudent) {
  let htmlContent = "";
  for (let stu of arrStudent) {
    let student = new Student();
    Object.assign(student, stu);
    htmlContent += `
            <tr>
                <td>${student.id}</td>
                <td>${student.fullName}</td>
                <td>${student.email}</td>
                <td>${student.address}</td>
                <td>${student.calculateAverage()}</td>
                <td>
                    <button class="btn btn-danger" onclick="removeStudent('${
                      student.id
                    }')">Xóa</button>

                    <button class="btn btn-primary mx-2" id="btn-fix" 
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal" onclick="fixStudent('${
                      student.id
                    }')">
                    Sửa
                    </button>
                </td>
            </tr>
        `;
  }
  document.querySelector("#tbodyStudent").innerHTML = htmlContent;
  return htmlContent;
}

document.querySelector("#btn-add").onclick = function () {
  var stu = new Student();
  var arrInput = document.querySelectorAll(".modal-body input");
  for (let input of arrInput) {
    let { id, value } = input;
    stu[id] = value;
  }
  

  listPerson.addPerson(stu);
  renderTableStudent(listPerson.arrPerson);
  saveStudent();
};

window.removeStudent = function (id) {
  listPerson.removePerson(id);
  renderTableStudent(listPerson.arrPerson);
};

window.fixStudent = function (id) {
  let stuFix = listPerson.getInfoPerson(id);
  if (stuFix) {
    var arrInput = document.querySelectorAll(".modal-body input");
    for (let input of arrInput) {
      let { id } = input;
      input.value = stuFix[id];
    }
  }
  document.getElementById("id").disabled = true;
  document.getElementById("btn-add").disabled = true;
  document.getElementById("btn-update").disabled = false;
};

document.querySelector("#btn-update").onclick = function () {
  var stuUpdate = new Student();
  var arrInput = document.querySelectorAll(".modal-body input");
  for (let input of arrInput) {
    let { id, value } = input;
    stuUpdate[id] = value;
  }
  listPerson.updatePerson(stuUpdate);
  renderTableStudent(listPerson.arrPerson);
  saveStudent();
};

function saveStudent() {
  let stringStudent = JSON.stringify(listPerson.arrPerson);
  localStorage.setItem("arrStudent", stringStudent);
}

function getArrStudent() {
  if (localStorage.getItem("arrStudent")) {
    var stringStudent = localStorage.getItem("arrStudent");
    listPerson.arrPerson = JSON.parse(stringStudent);
  }
}




