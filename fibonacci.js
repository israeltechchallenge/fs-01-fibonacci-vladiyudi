let button = document.getElementById("fButton");
let input = document.getElementById("fInput");
let finalResult = document.getElementById("displayF");
let error = document.querySelector(".error");
let serverError = document.getElementById("serverError");

button.addEventListener("click", runFibonacci);
input.addEventListener("focus", clearInput);

function runFibonacci() {
  if (input.value > 50) {
    input.classList.add("red");
    error.classList.remove("dNone");
  } else {
    finalResult.innerText = " ";
    finalResult.classList.add("spinner-border");
    fetch(`http://localhost:5050/fibonacci/${input.value}`)
      .then((response) => {
        try { if (!response.ok) 
           {
            throw Error (" ")
        }
        } 
        catch (error){
           error.massage = "Server Error: 42 is meaning of life"
            console.log(error)
           serverError.innerText = error.massage;
           finalResult.classList.remove("spinner-border");
        }
        finally {
            return response.json()
        }
  }
      )
      .then((data) => {
        finalResult.classList.remove("spinner-border");
        document.getElementById("displayF").innerText = data.result;
      });
  }
}

function clearInput() {
  input.value = " ";
  finalResult.innerText = " ";
  error.classList.add("dNone");
  input.classList.remove("red");
  serverError.innerText = " ";
}


