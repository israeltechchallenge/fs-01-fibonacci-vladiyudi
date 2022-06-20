// function fibonacci(fIndex){
// for (let i=2; i<=fIndex; i++){
// fSequence.push(fSequence[i-2]+fSequence[i-1])
// }
// return fSequence[fSequence.length-1]
// }

let fSequence
let count

function runFibonacci () {
    count=0
    fSequence = [0,1]
    fIndex = document.getElementById("fInput").value
    document.getElementById("displayF").innerText=fibonacci(fIndex)
    document.getElementById("fInput").value=" "
}

document.getElementById("fButton").addEventListener("click", runFibonacci)

function fibonacci (){
    while (count <= fIndex){
    fSequence.push(fSequence[fSequence.length-1]+fSequence[fSequence.length-2])
    count++
    fibonacci (fIndex)}
    return fSequence[fSequence.length-3]
}
