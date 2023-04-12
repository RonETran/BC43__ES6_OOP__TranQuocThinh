
var stringStudent = localStorage.getItem('arrStudent');
var stringEmployee = localStorage.getItem('arrEmployee');
var stringCustomer = localStorage.getItem('arrCustomer');
var stu = JSON.parse(stringStudent);
var emp = JSON.parse(stringEmployee);
var cus = JSON.parse(stringCustomer);

var arrAll = stu.concat(emp,cus)

function renderAll(arr) {
    var htmlString = '';
    for (var index = 0; index < arr.length; index++) {
        var per = arr[index];
        htmlString += `
            <tr>
                <td>${per.id}</td>
                <td>${per.type}</td>
                <td>${per.fullName}</td>
                <td>${per.email}</td>
                <td>${per.address}</td>
            </tr>
        `
    }
    document.getElementById('tbodyIndex').innerHTML = htmlString;
    return htmlString; 
}

let arrArrange = arrAll.sort((per,nextPer) => {
    let namePer = per.fullName.toLowerCase();
    let nameNextPer = nextPer.fullName.toLowerCase();
    if(namePer<nameNextPer) {
        return -1;
    }
    if(namePer>nameNextPer) {
        return 1;
    }
    return 0;
})

renderAll(arrArrange)



document.getElementById('filter').oninput = function () {
    var keyWord = document.getElementById('filter').value;
    var arrSearch = [];
    for (var index = 0; index < arrAll.length; index++) {
        var per = arrAll[index];
        var type = per.type;
        if (type.search(keyWord) !== -1) {
            arrSearch.push(per);
        }
    }

    renderAll(arrSearch);
}