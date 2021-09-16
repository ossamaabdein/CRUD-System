
let nameInput = document.getElementById("productName");
let categoryInput = document.getElementById("productCategory");
let priceInput = document.getElementById("productPrice");
let descriptionInput = document.getElementById("productDescription");
let addBtn = document.getElementById("addBtn");
let inputs = document.getElementsByClassName("form-control");
let nameWarning = document.getElementById("nameWarning");
let categoryWarning = document.getElementById("categoryWarning");
let priceWarning = document.getElementById("priceWarning");
let descWarning = document.getElementById("descWarning");
let searchWarning = document.getElementById("searchWarning");

let products = [];

let bla;    // to track edited row index


if (localStorage.getItem("productsList") != null) {
    products = JSON.parse(localStorage.getItem("productsList"));
    displayData();

}


addBtn.onclick = function() {
    if(addBtn.innerHTML == "Add Product") {
        validateData();
    } else {
        validateUpdatedDate();
    }
    displayData();
}

function validateData() {
    if(nameInput.classList.contains("is-valid")) {
        if(categoryInput.classList.contains("is-valid")) {
            if(priceInput.classList.contains("is-valid")) {
                if(descriptionInput.classList.contains("is-valid")) {
                    AddData();
                } else {
                    descWarning.classList.remove("d-none")
                }
            } else {
                priceWarning.classList.remove("d-none")
            }
        } else {
            categoryWarning.classList.remove("d-none")
        }
    } else {
        nameWarning.classList.remove("d-none")
    }
}

function AddData() {
    let product = {
        name: nameInput.value,
        category: categoryInput.value,
        price: priceInput.value,
        desc: descriptionInput.value
    }
    products.push(product);
    localStorage.setItem("productsList", JSON.stringify(products));
    clearData();
}

nameInput.onkeyup = function checkName() {
    var nameChecker = /^[A-za-z0-9 ]{3,20}$/;
    if (!nameChecker.test(nameInput.value)) {
        nameInput.classList.add("is-invalid");
        nameInput.classList.remove("is-valid");
        nameWarning.classList.remove("d-none");
    } else {
        nameInput.classList.remove("is-invalid");
        nameInput.classList.add("is-valid");
        nameWarning.classList.add("d-none");
    }
}

categoryInput.onkeyup = function checkName() {
    var categoryChecker = /^[A-za-z ]{3,20}$/;
    if (!categoryChecker.test(categoryInput.value)) {
        categoryInput.classList.add("is-invalid");
        categoryInput.classList.remove("is-valid");
        categoryWarning.classList.remove("d-none");
    } else {
        categoryInput.classList.remove("is-invalid");
        categoryInput.classList.add("is-valid");
        categoryWarning.classList.add("d-none");
    }
}

priceInput.onkeyup = function checkName() {
    var priceChecker = /^[0-9]{1,6}$/;
    if (!priceChecker.test(priceInput.value)) {
        priceInput.classList.add("is-invalid");
        priceInput.classList.remove("is-valid");
        priceWarning.classList.remove("d-none");
    } else {
        priceInput.classList.remove("is-invalid");
        priceInput.classList.add("is-valid");
        priceWarning.classList.add("d-none");
    }
}

descriptionInput.onkeyup = function checkName() {
    var descChecker = /^.{0,800}$/gm;
    if (!descChecker.test(descriptionInput.value)) {
        descriptionInput.classList.add("is-invalid");
        descriptionInput.classList.remove("is-valid");
        descWarning.classList.remove("d-none");
    } else {
        descriptionInput.classList.remove("is-invalid");
        descriptionInput.classList.add("is-valid");
        descWarning.classList.add("d-none");
    }
}



function displayData() {
    let tableRow = "";
    for (let i = 0; i < products.length; i++) {
        // 1st column is <th> just for bold-text 
        // storing "i" value into the global let "bla" to track the updated row
        tableRow += `<tr>
                        <th>${(i+1)}</th>
                        <td>${products[i].name}</td>
                        <td>${products[i].category}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].desc}</td>
                        <td><button onclick="deleteElement(${i})" class='btn btn-danger' id="delBtn">Del</button></td>
                        <td><button onclick="editElement(${i}); bla = ${i}" class='btn btn-success' id="editBtn">Edit</button></td>
                    <tr>`
    }

    document.getElementById("tableBody").innerHTML = tableRow;
}

function clearData() {
    for(let i=0; i< inputs.length; i++) {
        inputs[i].value = "";
        // remove name warnings after submission
        inputs[i].classList.remove("is-valid");
    }
    addBtn.innerHTML = "Add Product";   // after finishing an update
}


function deleteElement(index) {
        products.splice(index,1);
        displayData();
        localStorage.setItem("productsList", JSON.stringify(products));
    }


function search(val){
    let tableRow = "";
    for (let i = 0; i < products.length; i++) {
        if(products[i].name.toLowerCase().includes(val.toLowerCase())) {
            // 1st column is <th> just for bold-text 
            tableRow += `<tr>
                            <th>${(i+1)}</th>
                            <td>${products[i].name}</td>
                            <td>${products[i].category}</td>
                            <td>${products[i].price}</td>
                            <td>${products[i].desc}</td>
                            <td><button onclick="deleteElement(${i})" class='btn btn-danger' id="delBtn">Del</button></td>
                            <td><button onclick="editElement(${i})" class='btn btn-success' id="editBtn">Edit</button></td>
                        <tr>`;
        } 
    }
    document.getElementById("tableBody").innerHTML = tableRow;
    // warning if search input is not found
    if (tableRow != "") {
        searchWarning.classList.add("d-none");
    } else {
        searchWarning.classList.remove("d-none");
    }
}

// fill inputs
function editElement(index) {
    nameInput.value = products[index].name;
    categoryInput.value = products[index].category;
    priceInput.value = products[index].price;
    descriptionInput.value = products[index].desc;
    addBtn.innerHTML = "Update Product";
    for(let i=0; i< inputs.length; i++) {
        inputs[i].classList.add("is-valid");
    }
}


function updateElement(index) {
    let product;
     product = {
        name: nameInput.value,
        category: categoryInput.value,
        price: priceInput.value,
        desc: descriptionInput.value
    }
    products[index] = product;
    localStorage.setItem("productsList", JSON.stringify(products));
    clearData();
}

function validateUpdatedDate() {
    if(nameInput.classList.contains("is-valid")) {
        if(categoryInput.classList.contains("is-valid")) {
            if(priceInput.classList.contains("is-valid")) {
                if(descriptionInput.classList.contains("is-valid")) {
                    updateElement(bla);
                } else {
                    descWarning.classList.remove("d-none")
                }
            } else {
                priceWarning.classList.remove("d-none")
            }
        } else {
            categoryWarning.classList.remove("d-none")
        }
    } else {
        nameWarning.classList.remove("d-none")
    }
}