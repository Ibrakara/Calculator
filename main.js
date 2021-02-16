let display = document.querySelector("#display")
let numbers = document.querySelectorAll(".number")
let operatorsButtons = document.querySelectorAll(".operator")
var op, op1;
var first, second;
var screen = false

function add (a, b) {
    let result = a + b
    populate(result)
}
function subtract (a, b) {
    let result = a - b
    populate(result)
}
function multiply (a, b) {
    let result = a * b
    populate(result)
}
function divide (a, b) {
    if(b == 0){
        alert("You cannot divide a number by zero!")
        location.reload()
    }
    else{
        let result = a / b
        populate(result)
    }
}
function clear(){
    display.textContent = ""
    first = 0
    second = 0
    op = 0
    op1 = 0
    screen = false
}
function operator(action, a, b){
    let numA, numB;
    if(a.includes(".") && b.includes(".")){
        numA = parseFloat(a)
        numB = parseFloat(b)
    }else if(a.includes(".") && !b.includes(".")){
        numA = parseFloat(a)
        numB = parseInt(b)
    }else if(!a.includes(".") && b.includes(".")){
        numA = parseInt(a)
        numB = parseFloat(b)
    }else{
        numA = parseInt(a)
        numB = parseInt(b)
    }
    switch(action){
        case "add":
            add(numA, numB)
            break;
        case "subtract":
            subtract(numA, numB)
            break;
        case "multiply":
            multiply(numA, numB)
            break;
        case "divide":
            divide(numA, numB)
            break
    }
}
function populate(element){
    if(typeof element == "number"){
        display.textContent = element
    }
    else if(op1){
        if(screen){
            first = display.textContent
            display.textContent = `${element.textContent}`
            second = display.textContent
            screen = false
        }else{
            display.textContent += `${element.textContent}`
            second = display.textContent
        }
    }
    else{
        display.textContent += `${element.textContent}`
    }    
}

let numbersArr = [...numbers]
numbersArr.forEach((e) => {
    e.addEventListener("click", function(){
        populate(this)
    })
})
let operatorsButtonsArr = [...operatorsButtons]
operatorsButtonsArr.forEach((e) => {
    e.addEventListener("click", function(){
        if(!display.textContent && e.dataset.opr){
            alert("please first enter a number!!!")
        }
        if(e.dataset.opr == "clear"){
            clear()
        }
        else if(!op){
            op = e.dataset.opr
            op1 = op
            screen = true
        }
        else if(op1 && second){
            operator(op1, first, second)
            second = 0
            op = e.dataset.opr
            op1 = op
            screen = true
        }else if(op1 && !second){
            op = e.dataset.opr 
            op1 = op
        }
    })
})
