import { ListPerson } from "../models/ListPerson.js";
import { Customer } from "../models/Customer.js";

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
  var arrInput = document.querySelectorAll(".modal-body input, .modal-body select");
  for (let input of arrInput) {
    let { id, value } = input;
    cus[id] = value;
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
  var arrInput = document.querySelectorAll(".modal-body input, .modal-body select");
  for (let input of arrInput) {
    let { id, value } = input;
    cusUpdate[id] = value;
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
