// All items will store in this array
const expenses = [];
let ind;
// This array it create for show data
const dataOfOverViews = [
  {
    class: "total",
    image: "fa-solid fa-wallet",
    title: "Total Expenses",
    amount: 0,
    discription: "All Expenses",
  },
  {
    class: "number",
    image: "fa-solid fa-chart-line",
    title: "Number of Expenses",
    amount: 0,
    discription: "Total Transactions",
  },
  {
    class: "average",
    image: "fa-solid fa-chart-pie",
    title: "Average Expense",
    amount: 0,
    discription: "Per Transactions",
  },
];
// show variable is use to store a section.
const show = document.querySelector(".show-over-view");
// for loop is used for access all object from dataOfOverViews.
for (let dataOfOverView of dataOfOverViews) {
  // in show I am added Html for display
  show.innerHTML += `<div class = "${dataOfOverView.class}">
    <div class = "icon">
        <i class= "${dataOfOverView.image}"></i>
    </div>
    <div class = "title">
        <h3>${dataOfOverView.title}</h3>
    </div>
    <div class = "price">
        <h2>${dataOfOverView.amount}</h2>
    </div>
    <div class = discription>
        <p>${dataOfOverView.discription}</p>
    </div>
  </div>`;
}
// form variable is create for store form
const form = document.querySelector(".form");

// when i am click the submite btn my form will not go.
form.addEventListener("submit", (e) => {
  e.preventDefault();
  added();
});
// I am selecting all form element
const expenseName = document.querySelector("#name");
const expenseAmount = document.querySelector("#amount");
const expenseCategory = document.querySelector("#category");
const expenseDate = document.querySelector("#date");
const addBtn = document.querySelector(".form button");
function added() {
  // all vlaues are saved in variable
  const name = expenseName.value;
  const amount = parseFloat(expenseAmount.value);
  const category = expenseCategory.value;
  const date = expenseDate.value;
  if (name == "" || isNaN(amount) || category == "" || date == "") {
    alert("Please filed all box");
  } else {
    // add in array in form of object
    if (addBtn.innerText == "Add Expense") {
      expenses.push({
        name: name,
        amount: amount,
        category: category,
        date: date,
      });
    }
    // update the value if you want to edit the value
    else if (addBtn.innerText == "Update") {
      expenses[ind].name = name;
      expenses[ind].date = date;
      expenses[ind].category = category;
      expenses[ind].amount = amount;

      addBtn.innerHTML = "Add Expense";
    }
    // select all h2(price, number of expenses and avrage)
    addAmountLengthAverage();
    // after insert value remove the input value
    expenseName.value = "";
    expenseAmount.value = "";
    expenseDate.value = "";

    if (expenses.length >= 1) {
      success(expenses);
    }
  }
}
// function for render all element
function success(arr) {
  // select expense row for show the data
  const expenseRow = document.querySelector(".expense-row");
  // clear all row for again render array
  expenseRow.innerHTML = "";
  // add all data in expenseRow
  arr.forEach((e) => {
    const originalIndex = expenses.indexOf(e);
    expenseRow.innerHTML += `<div class="enteries">
        <p class="name">${e.name}</p>
        <p class="date">${e.date}</p>
        <p class="category">${e.category}</p>
        <p class="price-value">${e.amount}</p>
        <button class="edit" data-index="${originalIndex}">Edit</button>
        <button class="delete" data-index="${originalIndex}">Delete</button>
        </div>`;
  });
  edit();
  deletepart();
}
// This function is create for edit functionality
function edit() {
  // select Edit button
  const editBtn = document.querySelectorAll(".edit");
  // access all btn for using loop
  for (let i = 0; i < editBtn.length; i++) {
    // add EventListener for data go in form input
    editBtn[i].addEventListener("click", () => {
      const index = editBtn[i].dataset.index;
      addBtn.innerHTML = "Update";
      expenseName.value = expenses[index].name;
      expenseDate.value = expenses[index].date;
      expenseCategory.value = expenses[index].category;
      expenseAmount.value = expenses[index].amount;
      ind = index;
    });
  }
}
// This fuction is cteate for delete functionality
function deletepart() {
  // Select Delete Button
  const deleteBtn = document.querySelectorAll(".delete");
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", () => {
      // the code is delete in array one item
      const index = deleteBtn[i].dataset.index;
      expenses.splice(index, 1);
      success(expenses);
      addAmountLengthAverage();
    });
  }
}

function addAmountLengthAverage() {
  const allH2 = document.querySelectorAll(".price h2");
  // calulat total price
  const price = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  // display total price
  allH2[0].innerText = price.toFixed(2);
  // display Number of Expenses
  allH2[1].innerText = expenses.length;
  // display Average Expense
  if (expenses.length >= 1) {
    allH2[2].innerText = parseFloat((price / expenses.length).toFixed(2));
  } else {
    allH2[2].innerText = 0;
  }
}

// SEARCH LOGIC
// SELECT INPUT
const inputForSearch = document.querySelector(".search-form input");

const searchForm = document.querySelector(".search-form");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchItem();
});

function searchItem() {
  const newArr = expenses.filter((e) =>
    e.name.toLowerCase().includes(inputForSearch.value.toLowerCase()),
  );
  success(newArr);
}
