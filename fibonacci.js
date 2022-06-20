
let button = document.getElementById("fButton")
let input
let finalResult = document.getElementById("displayF")


button.addEventListener("click",runFibonacci)


function runFibonacci(){
    finalResult.innerText=" "
    finalResult.classList.add("spinner-border")

    input = document.getElementById("fInput").value

    fetch(`http://localhost:5050/fibonacci/${input}`)
    .then(response => response.json())
    .then(data => {
        finalResult.classList.remove("spinner-border")
        document.getElementById("displayF").innerText=data.result
    });

    document.getElementById("fInput").value=" "
}