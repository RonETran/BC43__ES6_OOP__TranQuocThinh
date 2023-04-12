//Khai báo 1 prototype chứa các hàm kiểm tra nhập liệu
function Validation () {
    this.kiemTraRong = function (value,idError,name) {
        if(value.trim() === ''){
            document.getElementById(idError).innerHTML = `${name} không được bỏ trống !`;
            return false;
        }
        document.getElementById(idError).innerHTML = '';
        return true;
    }

    this.kiemTraKyTu = function (value,idError,name) {
        var regexLetter = /^[A-Z a-z]+$/;
        if(regexLetter.test(value)){
            document.getElementById(idError).innerHTML = ''
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} không hợp lệ!`;
        return false;
    }

    this.kiemTraEmail = function (value,idError,name) {
        var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(regexEmail.test(value)) {
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} không hợp lệ!`;
        return false;
    }

    this.kiemTraSo = function (value,idError,name) {
        var regexNumber = /^[0-9]+$/;
        if(regexNumber.test(value)){
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} không hợp lệ!`;
        return false;
    }

    this.kiemTraDanhGia = function (value,idError,name) {
        var reg = /Chọn đánh giá/g;
        if (reg.test(value)) {
            document.getElementById(idError).innerHTML = `Vui lòng chọn ${name} !`;
            return false;
        }
        document.getElementById(idError).innerHTML = '';
        return true;
    }


    this.kiemTraDiaChi = function (value,idError,name) {
        var regexp = /^[\w\s.-]+\d+,\s*[\w\s.-]+$/;
        if(regexp.test(value)) {
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} phải gồm số nhà, tên đường, thành phố và dấu phẩy ngăn cách trước thành phố. (Ví dụ: )`;
        return false;
    }
}