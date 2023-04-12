import { ListPerson } from "../models/ListPerson.js";
import { Customer } from "../models/Customer.js";
import { Validation } from "../util/Validation.js";

document.getElementById("addCus").onclick = () => {
  document.getElementById("btn-update").disabled = true;
  document.getElementById("btn-add").disabled = false;
  document.getElementById("id").disabled = false;
};

let listPerson = new ListPerson();
getArrCustomer();
renderTableCustomer(listPerson.arrPerson);

function renderTableCustomer(arrCustomer) {
  let htmlContent = "";
  for (let cus of arrCustomer) {
    let customer = new Customer();
    Object.assign(customer, cus);
    htmlContent += `
            <tr>
                <td>${customer.id}</td>
                <td>${customer.fullName}</td>
                <td>${customer.email}</td>
                <td>${customer.address}</td>
                <td>${customer.companyName}</td>
                <td>${customer.invoiceValue}</td>
                <td>${customer.rating}</td>
                <td>
                    <button class="btn btn-danger" onclick="removeCustomer('${
                      customer.id
                    }')">Xóa</button>

                    <button class="btn btn-primary mx-2" id="btn-fix" 
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal" onclick="fixCustomer('${
                      customer.id
                    }')">
                    Sửa
                    </button>
                </td>
            </tr>
        `;
  }
  document.querySelector("#tbodyCustomer").innerHTML = htmlContent;
  return htmlContent;
}

document.querySelector("#btn-add").onclick = function () {
  var cus = new Customer();
  let check = new Validation();

  var arrInput = document.querySelectorAll(".modal-body input, .modal-body select");
  for (let input of arrInput) {
    let { id, value } = input;
    cus[id] = value;
  }

  var valid = true;
  valid = check.kiemTraRong(cus.id,'error-id','Mã') & check.kiemTraRong(cus.fullName,'error-name','Tên') & check.kiemTraRong(cus.email,'error-email','Email') & check.kiemTraRong(cus.address,'error-address','Địa chỉ') & check.kiemTraRong(cus.companyName,'error-company','Tên công ty') & check.kiemTraRong(cus.invoiceValue,'error-value','Trị giá hóa đơn') ;

  valid = check.kiemTraSo(cus.id,'error-id-1','Mã') & check.kiemTraSo(cus.invoiceValue,'error-value-1','Trị giá hóa đơn');
  valid = check.kiemTraKyTu(cus.fullName,'error-name-1','Tên');
  valid = check.kiemTraEmail(cus.email,'error-email-1','Email');
  valid = check.kiemTraDanhGia(cus.rating,'error-rating','đánh giá');

  if(!valid){
    return;
  }


  listPerson.addPerson(cus);
  renderTableCustomer(listPerson.arrPerson);
  saveCustomer();
};

window.removeCustomer = function (id) {
  listPerson.removePerson(id);
  renderTableCustomer(listPerson.arrPerson);
};

window.fixCustomer = function (id) {
  let cusFix = listPerson.getInfoPerson(id);
  if (cusFix) {
    var arrInput = document.querySelectorAll(".modal-body input, .modal-body select");
    for (let input of arrInput) {
      let { id } = input;
      input.value = cusFix[id];
    }
  }
  document.getElementById("id").disabled = true;
  document.getElementById("btn-add").disabled = true;
  document.getElementById("btn-update").disabled = false;
};

document.querySelector("#btn-update").onclick = function () {
  var cusUpdate = new Customer();
  let check = new Validation();

  var arrInput = document.querySelectorAll(".modal-body input, .modal-body select");
  for (let input of arrInput) {
    let { id, value } = input;
    cusUpdate[id] = value;
  }

  var valid = true;
  valid = check.kiemTraRong(cusUpdate.id,'error-id','Mã') & check.kiemTraRong(cusUpdate.fullName,'error-name','Tên') & check.kiemTraRong(cusUpdate.email,'error-email','Email') & check.kiemTraRong(cusUpdate.address,'error-address','Địa chỉ') & check.kiemTraRong(cusUpdate.companyName,'error-company','Tên công ty') & check.kiemTraRong(cusUpdate.invoiceValue,'error-value','Trị giá hóa đơn') ;

  valid = check.kiemTraSo(cusUpdate.id,'error-id-1','Mã') & check.kiemTraSo(cusUpdate.invoiceValue,'error-value-1','Trị giá hóa đơn');
  valid = check.kiemTraKyTu(cusUpdate.fullName,'error-name-1','Tên');
  valid = check.kiemTraEmail(cusUpdate.email,'error-email-1','Email');
  valid = check.kiemTraDanhGia(cusUpdate.rating,'error-rating','đánh giá');

  if(!valid){
    return;
  }

  listPerson.updatePerson(cusUpdate);
  renderTableCustomer(listPerson.arrPerson);
  saveCustomer();
};

function saveCustomer() {
  let stringCustomer = JSON.stringify(listPerson.arrPerson);
  localStorage.setItem("arrCustomer", stringCustomer);
}

function getArrCustomer() {
  if (localStorage.getItem("arrCustomer")) {
    var stringCustomer = localStorage.getItem("arrCustomer");
    listPerson.arrPerson = JSON.parse(stringCustomer);
  }
}
