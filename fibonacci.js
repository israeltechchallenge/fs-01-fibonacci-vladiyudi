function runLocalFibonacci() {
  count = 0;
  fSequence = [0, 1];
  fIndex = document.getElementById("fInput").value;
  document.getElementById("displayF").innerText = fibonacci(fIndex);
  document.getElementById("fInput").value = " ";
}

// document.getElementById("fButton").addEventListener("click", runLocalFibonacci)

function runLocalFibonacci(fIndex) {
  let fSequence = [0, 1];
  for (let i = 2; i <= fIndex; i++) {
    fSequence.push(fSequence[i - 2] + fSequence[i - 1]);
  }
  finalResult.classList.remove(
    "spinner-border",
    "text-primary",
    "font-weight-bold"
  );
  finalResult.classList.add("fs-4", "text-decoration-underline");
  finalResult.innerText = fSequence[fSequence.length - 1];
}

let button = document.getElementById("fButton");
let input = document.getElementById("fInput");
let finalResult = document.getElementById("displayF");
let error = document.querySelector(".error");
let serverError = document.getElementById("serverError");
let resultContainer = document.querySelector(".resultContainer");
let spinnerResult = document.getElementById("spinnerResult");
let saveCalculation = document.getElementById("saveCalculation");
let select = document.getElementById("select")
let showSelectedValue = document.querySelector(".text-muted")

button.addEventListener("click", chooseLocalOrServer);
input.addEventListener("focus", clearInput);

function chooseLocalOrServer() {
    if (input.value.length) {
        button.disabled = true;
   
    if (input.value > 50) {
        input.classList.add("border-danger", "text-danger");
        error.classList.remove("d-none");
      } 
  else if (saveCalculation.checked) {
    runServerFibonacci();
  } else  if (input.value<=0){
    finalResult.classList.remove(
        "spinner-border",
        "text-primary",
        "font-weight-bold"
      );
      finalResult.classList.add("text-danger");
      finalResult.innerText = "Error: number can't be smaller than 1";
    } else {
    runLocalFibonacci(input.value);
  }
}}

function runServerFibonacci() {
      finalResult.classList.add("spinner-border", "text-primary");
      fetch(`http://localhost:5050/fibonacci/${input.value}`)
        .then((res) => {
          if (res.ok) return res.json();
          else {
            return res.text().then((text) => {
              throw new Error(text);
            });
          }
        })
        .then((data) => {
          finalResult.classList.remove(
            "spinner-border",
            "text-primary",
            "font-weight-bold"
          );
          finalResult.classList.add("fs-4", "text-decoration-underline");
          finalResult.innerText = data.result;
          fetchResults(selectedValue);
        })
        .catch((err) => {
          finalResult.classList.remove(
            "spinner-border",
            "text-primary",
            "font-weight-bold"
          );
          finalResult.classList.add("text-danger");
          finalResult.innerText = err;
        });
    
  }


function clearInput() {
  input.value = " ";
  finalResult.innerText = " ";
  error.classList.add("dNone");
  input.classList.remove("border-danger", "text-danger", "fs-6");
  serverError.innerText = " ";
  finalResult.classList.remove(
    "text-danger",
    "fs-4",
    "text-decoration-underline"
  );
  error.classList.add("d-none");
  button.disabled = false;
}

function fetchResults(selectedValue) {
  spinnerResult.classList.remove("d-none");
  fetch("http://localhost:5050/getFibonacciResults")
    .then((response) => response.json())
    .then((data) => {
      spinnerResult.classList.add("d-none");
      let list = data.results;
     let sortedList = sortResultsDD(selectedValue, list)
     resultContainer.innerHTML=""
      for (let item of sortedList) {
        let newElm = document.createElement("div");
        newElm.innerHTML = `The Fibonnaci Of <b>${item.number}</b> is <b>${
          item.result
        }</b>. Calculated at: ${new Date(item.createdDate)}`;
        resultContainer.appendChild(newElm);
        newElm.className =
          "fs-5 border-bottom pb-3 border-secondary mt-3 d-inline-block";
      }
    });
}

let selectedValue


window.addEventListener("load", fetchResults);

let dropDown = document.getElementsByClassName("dropdown-item")

Array.from(dropDown).forEach((item)=>item.addEventListener("click", (event)=>{
    selectedValue = event.target.innerText
    showSelectedValue.innerText=selectedValue
    fetchResults(selectedValue)
})
)

function sortResultsDD (selectedValue, list){
    if (selectedValue==="Number Asc") 
    return list.sort((a,b) =>(a.number > b.number ? 1 : -1))
    else if (selectedValue==="Number Desc") 
    return list.sort((a,b) =>(a.number < b.number ? 1 : -1))
    else if (selectedValue==="Date Asc") 
    return list.sort((a,b) =>(a.createdDate > b.createdDate ? 1 : -1))
    else if (selectedValue==="Date Desc") 
    return list.sort((a,b) =>(a.createdDate < b.createdDate ? 1 : -1))
    else return list
}

select.addEventListener("change", fetchResults)