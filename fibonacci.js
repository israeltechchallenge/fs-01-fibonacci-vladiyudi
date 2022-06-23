let button = document.getElementById("fButton");
let input = document.getElementById("fInput");
let finalResult = document.getElementById("displayF");
let error = document.querySelector(".error");
let serverError = document.getElementById("serverError");
let resultContainer = document.querySelector(".resultContainer");
let spinnerResult = document.getElementById("spinnerResult");

button.addEventListener("click", runFibonacci);
input.addEventListener("focus", clearInput);

function runFibonacci() {
    if (input.value.length){
  if (input.value > 50) {
    input.classList.add("border-danger", "text-danger");
    error.classList.remove("d-none");
  } else {
    finalResult.innerText = " ";
    finalResult.classList.add("spinner-border", "text-primary");
    fetch(`http://localhost:5050/fibonacci/${input.value}`)
    .then(res => {
        if(res.ok) return res.json()
        return res.text().then(text => {throw new Error(text)})
      })
      .then((data) => {
          finalResult.classList.remove("spinner-border", "text-primary", "font-weight-bold");
          finalResult.classList.add("fs-4", "text-decoration-underline")
          finalResult.innerText = data.result;
        fetchResults();
    })
    .catch((err) => {
        console.log("this is: " + err);
        finalResult.classList.remove("spinner-border", "text-primary", "font-weight-bold");
        finalResult.classList.add("text-danger")
        finalResult.innerText=err
    })
}
    }}

function clearInput() {
  input.value = " ";
  finalResult.innerText = " ";
  error.classList.add("dNone");
  input.classList.remove("border-danger", "text-danger", "fs-6");
  serverError.innerText = " ";
  finalResult.classList.remove("text-danger", "fs-4", "text-decoration-underline")
  error.classList.add("d-none")
}

function fetchResults() {
  spinnerResult.classList.remove("d-none");
  fetch("http://localhost:5050/getFibonacciResults")
    .then((response) => response.json())
    .then((data) => {
      spinnerResult.classList.add("d-none");
      let list = data.results
      console.log(data)
      console.log(list);
      for (item of list) {
        let newElm = document.createElement("div");
        newElm.innerHTML = `The Fibonnaci Of <b>${item.number}</b> is <b>${
          item.result
        }</b>. Calculated at: ${new Date(item.createdDate)}`;
        resultContainer.appendChild(newElm);
        newElm.className = "fs-5 border-bottom pb-3 border-secondary mt-3";
      }
    });
}

window.addEventListener("load", fetchResults);


