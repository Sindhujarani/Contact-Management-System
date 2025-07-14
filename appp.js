

let form = document.getElementById("myForm"),
  imgInput = document.querySelector(".img"),
  file = document.getElementById("imgInput"),
  firstName = document.getElementById("FirstName"),
  lastName = document.getElementById("LastName"),
  adress = document.getElementById("Adress"),
  email = document.getElementById("EmailID"),
  phone = document.getElementById("Phone"),
  submitBtn = document.querySelector(".submit"),
  userInfo = document.getElementById("data"),
  modal = document.getElementById("userForm"),
  modalTitle = document.querySelector("#userForm .modal-title"),
  newUserBtn = document.querySelector(".newUser");

let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : [];
let isEdit = false, editId;

newUserBtn.addEventListener('click', () => {
  submitBtn.innerText = 'Submit';
  modalTitle.innerHTML = "Fill the Form";
  isEdit = false;
  imgInput.src = "./profile-icon-design-free-vector.jpg";
  form.reset();
});

file.onchange = function () {
  if (file.files[0].size < 1000000) {
    let reader = new FileReader();
    reader.onload = function (e) {
      imgInput.src = e.target.result;
    };
    reader.readAsDataURL(file.files[0]);
  } else {
    alert("File too large!");
  }
};

function readInfo(pic, fName, lName, address, email, phone) {
  document.querySelector('.showImg').src = pic;
  document.getElementById('showFirstName').value = fName;
  document.getElementById('showLastName').value = lName;
  document.getElementById('showAdress').value = address;
  document.getElementById('showEmailID').value = email;
  document.getElementById('showPhone').value = phone;
}

function editInfo(index, pic, fName, lName, address, emailVal, phoneVal) {
  isEdit = true;
  editId = index;
  imgInput.src = pic;
  firstName.value = fName;
  lastName.value = lName;
  adress.value = address;
  email.value = emailVal;
  phone.value = phoneVal;

  submitBtn.innerText = "Update";
  modalTitle.innerText = "Update The Form";
}

function deleteInfo(index) {
  if (confirm("Are you sure you want to delete?")) {
    getData.splice(index, 1);
    localStorage.setItem("userProfile", JSON.stringify(getData));
    showInfo();
  }
}

function showInfo() {
  userInfo.innerHTML = '';
  getData.forEach((element, index) => {
    userInfo.innerHTML += `
      <tr class="employeeDetails">
        <td>${index + 1}</td>
        <td><img src="${element.picture}" width="50" height="50"></td>
        <td>${element.employeeFName}</td>
        <td>${element.employeeLName}</td>
        <td>${element.employeeAdress}</td>
        <td>${element.employeeEmail}</td>
        <td>${element.employeePhone}</td>
        <td>
          <button class="btn btn-success" onclick="readInfo('${element.picture}','${element.employeeFName}','${element.employeeLName}','${element.employeeAdress}','${element.employeeEmail}','${element.employeePhone}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
          <button class="btn btn-primary" onclick="editInfo(${index},'${element.picture}','${element.employeeFName}','${element.employeeLName}','${element.employeeAdress}','${element.employeeEmail}','${element.employeePhone}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
          <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash3-fill"></i></button>
        </td>
      </tr>
    `;
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const information = {
    picture: imgInput?.src || "./profile-icon-design-free-vector.jpg",
    employeeFName: firstName.value,
    employeeLName: lastName.value,
    employeeAdress: adress.value,
    employeeEmail: email.value,
    employeePhone: phone.value
  };

  if (!isEdit) {
    getData.push(information);
  } else {
    getData[editId] = information;
    isEdit = false;
  }

  localStorage.setItem('userProfile', JSON.stringify(getData));
  submitBtn.innerText = "Submit";
  modalTitle.innerText = "Fill the Form";
  showInfo();
  form.reset();
  imgInput.src = "./profile-icon-design-free-vector.jpg";

  // ✅ Use Bootstrap API to close modal
  const modalInstance = bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal);
  modalInstance.hide();
});

showInfo();
