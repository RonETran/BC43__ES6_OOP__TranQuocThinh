import { ListPerson } from "../models/ListPerson.js";
import { Student } from "../models/Student.js";
import { Validation } from "../util/Validation.js";


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
  let check = new Validation();

  var arrInput = document.querySelectorAll(".modal-body input");
  for (let input of arrInput) {
    let { id, value } = input;
    stu[id] = value;
  }
  
  var valid = true;
  valid = check.kiemTraRong(stu.id,'error-id','Mã') & check.kiemTraRong(stu.fullName,'error-name','Tên') & check.kiemTraRong(stu.email,'error-email','Email') & check.kiemTraRong(stu.address,'error-address','Địa chỉ') & check.kiemTraRong(stu.math,'error-math','Điểm') & check.kiemTraRong(stu.physics,'error-physics','Điểm') & check.kiemTraRong(stu.chemistry,'error-chemistry','Điểm') ;

  valid = check.kiemTraSo(stu.id,'error-id-1','Mã') & check.kiemTraSo(stu.math,'error-math-1','Điểm') & check.kiemTraSo(stu.physics,'error-physics-1','Điểm') & check.kiemTraSo(stu.chemistry,'error-chemistry-1','Điểm');
  valid = check.kiemTraKyTu(stu.fullName,'error-name-1','Tên');
  valid = check.kiemTraEmail(stu.email,'error-email-1','Email');
  valid = checkId();


  if(!valid){
    return;
  }
  
  listPerson.addPerson(stu);
  renderTableStudent(listPerson.arrPerson);
  saveStudent();

  var clearInput = document.querySelectorAll(".modal-body input");
  for (let input of clearInput) {
    input.value = '';
  }

  document.querySelector('button[data-bs-dismiss]').click();
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
  let check = new Validation();

  var arrInput = document.querySelectorAll(".modal-body input");
  for (let input of arrInput) {
    let { id, value } = input;
    stuUpdate[id] = value;
  } 

  var valid = true;
  valid = check.kiemTraRong(stuUpdate.id,'error-id','Mã') & check.kiemTraRong(stuUpdate.fullName,'error-name','Tên') & check.kiemTraRong(stuUpdate.email,'error-email','Email') & check.kiemTraRong(stuUpdate.address,'error-address','Địa chỉ') & check.kiemTraRong(stuUpdate.math,'error-math','Điểm') & check.kiemTraRong(stuUpdate.physics,'error-physics','Điểm') & check.kiemTraRong(stuUpdate.chemistry,'error-chemistry','Điểm') ;

  valid = check.kiemTraSo(stuUpdate.id,'error-id-1','Mã') & check.kiemTraSo(stuUpdate.math,'error-math-1','Điểm') & check.kiemTraSo(stuUpdate.physics,'error-physics-1','Điểm') & check.kiemTraSo(stuUpdate.chemistry,'error-chemistry-1','Điểm');
  valid = check.kiemTraKyTu(stuUpdate.fullName,'error-name-1','Tên');
  valid = check.kiemTraEmail(stuUpdate.email,'error-email-1','Email');

  if(!valid){
    return;
  }
  
  listPerson.updatePerson(stuUpdate);
  renderTableStudent(listPerson.arrPerson);
  saveStudent();

  var clearInput = document.querySelectorAll(".modal-body input");
  for (let input of clearInput) {
    input.value = '';
  }

  document.querySelector('button[data-bs-dismiss]').click();
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

function checkId() {
  var valid = true;
  var stringStu = localStorage.getItem('arrStudent');
  var stu = JSON.parse(stringStu);
  var input = document.getElementById('id').value;
  for(let i of stu){
    if(input === i.id || input === '') {
      return false;
    }
  }
  return valid;
}


