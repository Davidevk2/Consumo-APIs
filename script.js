const table = document.getElementById("table");
const tbody = document.createElement("tbody");

const btnAdd = document.getElementById("btnAdd");
const btnClose = document.getElementById("btnClose");
const btnClose2 = document.getElementById("btn-close");

const modalForm = document.getElementById("modalForm");
const contentDetails = document.getElementById("content-details");
const contentForm = document.getElementById("content-form");
const conteId = document.getElementById("form-groupId");

contentDetails.style.display = "none";


window.addEventListener("DOMContentLoaded", ()=>{

// data = fetch("https://memin.io/public/api/users/", {method, headers, body})
let  result = fetch("https://memin.io/public/api/v2/users")
.then(response =>{//response  convert incoming data 
    return response.json();
}).then(records => {// work with incoming data 
    // data = data.slice(8900, 10000);
    records.data.forEach((element, idx) => {

        const row = document.createElement("tr");
        let numCell = document.createElement("td");
        numCell.textContent = 1 + idx++;
        row.appendChild(numCell);   

        let idCell = document.createElement("td");
        idCell.textContent = element.id;
        row.appendChild(idCell);

        let nameCell = document.createElement("td");
        nameCell.textContent = element.name;
        row.appendChild(nameCell);

        let emailCell = document.createElement("td");
        emailCell.textContent = element.email;
        row.appendChild(emailCell);

        let optionsCell = document.createElement("td");
        optionsCell.innerHTML = `<button class="btn btn-primary btn-sm" onclick="loadEditUser(${element.id})">Edit</button> <button class="btn btn-secondary btn-sm" onclick="openDetails();"
        >Details</button> <button class="btn btn-danger btn-sm" onclick="deleteUser(${element.id})">Delete</button>`;
        row.appendChild(optionsCell);

        tbody.appendChild(row);

    });
    //  revisar();
});

table.appendChild(tbody);


});
 function revisar (){
     const trs = document.getElementsByTagName("tr");
     console.log(typeof(trs));

    for (item of trs){
        console.log(item.childNodes[3].innerText);
    }
 }

// Create a new user 
const btnSave = document.getElementById("btnSave");

btnSave.onclick  = POST;


userData = {
    "name": "",
    "password": "",
    "email":""
}

user = {
    id : "",
    name: "",
    pass : "",
    email: "",
    emailVerified: "",
    remenberToken: "",
    createdAt: "",
    updateAt: ""
}

function checkAction(){
    if(formId.value = ""){
        
        if (formName.value != "" && formEmail.value != "" && formPass.value != "") {
            let formId = document.formUsers.name;
            let formName = document.formUsers.name.value;
            let formEmail = document.formUsers.email.value;
            let formPass = document.formUsers.password.value;
        } else {
            console.log("los campos están vacios");
        }
    }else{
        
    }
}

// CREATE User
function POST(){
    /*let name  = document.formUsers.name.value;
    let email = document.formUsers.email.value;
    let password = document.formUsers.password.value;
*/
    

    fetch("https://memin.io/public/api/users", {
        method: 'POST', 
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            name: formName,
            email: formEmail,
            password: "pass"
        })
    } )
    .then(response =>{
        console.log(response);
        clearData();
    })
    .catch(error=>{console.error("Error al crear el user:", error);});

   
    
}

function loadEditUser(userId){
    getDataDataById(userId); 
    conteId.style.display = "block";   
    console.log("Let's to edit user: ", userId);
    let result = fetch(`https://memin.io/public/api/users/${userId}`)
        .then(result => {
            return result.json();
        })
        .then(record => {
            // console.log(record);
            document.formUsers.id.value  = record.id;
            document.formUsers.name.value = record.name;
            document.formUsers.email.value = record.email;
            document.formUsers.password.value = record.password;
        }).catch(error => {
            console.error("Error to load data: ", error);
        })
    openModal();

}
function  openDetails(){
    openModal();
    contentDetails.style.display = "block";
    contentForm.style.display = "none";
    btnSave.style.display = "none";
}

// Edit User -> PUT
function editUser(userId, userData){

    fetch(`https://memin.io/public/api/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            console.log(response);
            clearData();
        })
        .catch(error => { console.error("Error: to edit user:", error); });

}

// Delete user
function deleteUser(userId){
    //console.log("Vamos a eliminar: ", userId);
    if(confirm(`Sure that you want to delete user with id: ${userId}`)){
        fetch(`https://memin.io/public/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json"
            },
            })
            .then(data=>{
                return data.json();
            })
            .then(response => {
                console.log(response);
                window.location.reload();
            })
            .catch(error => { console.error("Error al crear el user:", error); });
    }else{
        console.log("No se eliminara el user");
    }
}



function getDataDataById(userId){
    let result  = fetch(`https://memin.io/public/api/users/${userId}`)
    .then(result =>{
        return result.json();
    })
    .then(record=>{
        user.id = record.id;
        user.name = record.name;
        user.email = record.email;
        // console.log(user);
    }).catch(error =>{
        console.error("Error to load data: ", error);
    })
}



// Modal to create new users
btnAdd.addEventListener("click", openModal);

btnClose.addEventListener("click", closeForm);
btnClose2.addEventListener("click", closeForm);

function openModal() {
    modalForm.style.display = "block";
}

function closeForm() {
    modalForm.style.display = "none";
    resetDefaultContent();
    clearData();
}

window.onclick = function (event) {
    if (event.target == modalForm) {
        modalForm.style.display = "none";
        resetDefaultContent();
        clearData();
    }
} 


// password visibility
const inputPass = document.getElementById("txtPass");
const checkBoxPass = document.getElementById("showPass");

checkBoxPass.addEventListener("click", (e)=>{

    const type = inputPass.getAttribute("type") === "password"? "text": "password";
    inputPass.setAttribute("type", type); 
 
})

// clean data from inputs
function clearData(){
    document.formUsers.id.value = "";
    document.formUsers.name.value = "";
    document.formUsers.email.value = "";
    document.formUsers.password.value = "";
}

function resetDefaultContent(){
    contentDetails.style.display = "none";
    contentForm.style.display = "block";
    btnSave.style.display = "block";
    conteId.style.display = "none";
}

