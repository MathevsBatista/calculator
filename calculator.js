function add(number1, number2) {
    return +number1 + +number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    if(number2 == "0"){
	return "🚫/0";
    }
    return number1 / number2;
}

function operate(number1, operator, number2) {
    switch(operator) {
	case "+":
	    return add(number1, number2);
	case "-":
	    return subtract(number1, number2);
	case "*":
	    return multiply(number1, number2);
	case "/":
	    return divide(number1, number2);
	default:
	    return "Invalid!"
    }
}

function calculator(numberOperatorNumberArray) {
    const numberOperatorNumber = [];
    const numberOperatorNumberArrayReversed = numberOperatorNumberArray.reverse();

    for (let i = 0; numberOperatorNumberArrayReversed.length > 0; i++) {
	numberOperatorNumber.push(numberOperatorNumberArrayReversed.pop());

	if(numberOperatorNumber.length == 3) {
	    i = 0;
	    result = operate(...numberOperatorNumber);

	    if (typeof result == "number") {
		result = parseFloat(result.toFixed(2));
	    }

	    numberOperatorNumber.length = 0;
	    numberOperatorNumber.push(result);
	}
    }

    return numberOperatorNumber[0];
}

const displayLastResult = document.querySelector(".display-last-result")
const displayResult = document.querySelector(".display-result")

const numberButtons = document.querySelectorAll(".numbers button");
const deleteButton = document.querySelector(".delete");
const clearButton = document.querySelector(".clear");
const operationButtons = document.querySelectorAll(".operators button");
const resultButton = document.querySelector(".result-button");
let numberOperatorNumberString = "";

numberButtons.forEach( (numberButton) => {
    numberButton.addEventListener("click", () => {
	numberOperatorNumberString += numberButton.textContent;
	const regexRemoveSpaceBetweenNumbers = /(\d)\s+(?=\d)/g;
	numberOperatorNumberString = numberOperatorNumberString.replace(regexRemoveSpaceBetweenNumbers, "$1");

	displayResult.textContent = numberOperatorNumberString.trim();
    } );
} );

operationButtons.forEach( (operationButton) => {
    operationButton.addEventListener("click", () => {
	let numberOperatorNumber = numberOperatorNumberString.trim().split(" ");

	if(numberOperatorNumber.length == 3){
	    displayLastResult.textContent = displayResult.textContent;

	    displayResult.textContent = numberOperatorNumberString = calculator(numberOperatorNumber);
	}

	numberOperatorNumberString += " " + operationButton.textContent + " ";
	displayResult.textContent = numberOperatorNumberString.trim();
    } );
} );

deleteButton.addEventListener("click", () => {
    numberOperatorNumberString = numberOperatorNumberString.trim().slice(0, -1);
    
    displayResult.textContent = numberOperatorNumberString;
} );

clearButton.addEventListener("click", () => {
    numberOperatorNumberString = "";
    displayResult.textContent = "";
} );

resultButton.addEventListener("click", () => {
    displayLastResult.textContent = displayResult.textContent;
    displayResult.textContent = calculator(numberOperatorNumberString.split(" "));
    numberOperatorNumberString = "";
} );

