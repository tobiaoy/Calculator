//DOM selections
const currentScreen = document.querySelector('#current-scr');
const previousScreen = document.querySelector('#prev-scr');
const numButtons = document.querySelectorAll('.btn');
const opButtons = document.querySelectorAll('.op-btn');
const viewButtons = document.querySelectorAll('.view-btn');
const equalsButton = document.querySelector('.equals-btn');
const dotButton = document.querySelector('.dot-btn');
const switchButton = document.querySelector('.switch-btn');

//global variables
let currentNum;
let previousNum;
let currentOp;

//operations
function add (num1, num2){
    return parseFloat(num1) + parseFloat(num2);
}

function subtract (num1, num2){
    return parseFloat(num1) - parseFloat(num2);
}

function multiply (num1, num2){
    return parseFloat(num1) * parseFloat(num2);
}

function divide (num1, num2){
    return parseFloat(num1) / parseFloat(num2);
}


//operate function to incorporate the above functions
function operate(num1, num2, op){
    switch(op){
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = subtract(num1, num2);
            break;
        default:
            return;
    }

    return result;
}

//function to change the sign of the number
    function changeSign(){
        if (currentNum === null || currentNum === '' || currentNum == 0){
            return;
        } else {
            (parseFloat(currentNum) * -1).toString;
        }
        
        updateDisplay();
    }

//function to incorporate the addition of a dot
function addDot(){
	tempNum = currentScreen.innerHTML;
	
	if (tempNum.includes('.')){
		return;
	} else if (tempNum === '' || tempNum === null){
		currentNum += '0.';
	} else {
		currentNum += '.';	
	} 
}

//function for equals to button
function calculate(){
	if (currentNum === null && previousNum === null){
		return;
	} else if (currentNum === '' && previousNum !== null){
		currentNum = previousNum;
	} else if (currentNum !== null && previousNum === null){
		return currentNum;
	} else if (currentNum !== null && currentOp !== null && previousNum !== null){
		let tempResult = operate(previousNum, currentNum, currentOp)
		previousNum = tempResult;
		currentNum = '';
		currentOp = '';
	}
}

//function for clearing the display
function clearDisplay(){
	currentNum = '';
	previousNum = '';
	currentOp = '';
	
	updateDisplay();
}

//function to clear current entry
function clearEntry(){
	currentNum = '';
	
	updateDisplay();
}

//function to update display
    //function should change the current screen when it's called
    //function uses the text content to update the display
    function updateDisplay(){
        previousScreen.textContent = previousNum;
        currentScreen.textContent = currentNum;
    }

//function to switch displays
    //function should take whatever is in the current display and move it to the previous display
    //functions should react to an operation or an equals call
    function switchScreen(){
        previousNum = currentNum;
        currentNum = '';
        
        updateDisplay();
    }

//function to update numbers
    //should truncate numbers beyond a certain length
    //should only update the current display
    function inputNum(e) { 
        currentNum += e.target.id;

        if (currentNum.length > 12){
            currentNum = currentNum.substring(0, 12);
        }
        updateDisplay();
    }

//function to update operators
    //user should be able to chain operators
    //if an operator is already there then ignore subsequent selection
    //if the user has entered a second number and enters an operator then calculate 
        //change the previous number to the result and the operator to the new operator
    //user should not be able to enter an operator if the current number is null
    function inputOp(e){
        let tempResult;
        
        if (currentOp === null){
            currentOp = e.target.id;
        }
        
        //condition where there is an entered operator but no second number
        if (currentOp !== null && currentNum === '' && previousNum !== null){
            currentOp = e.target.id;
        }
        
        //condition to check if there is no number at all
        if (previousNum === null || currentNum === null){
            return;
        }
        
        //condition to operate if all operands are available
        if(previousNum !== null && currentNum !== null && currentOp !== null){
            tempResult = operate(previousNum, currentNum, currentOp)
            previousNum = tempResult;
            currentOp = e.target.id;
            currentNum = '';
        }
        
    }

//function to manage updaters
    //add event listeners to the buttons and incorporate the necessary logic through the updaters
    function updateManager(){
        numButtons.forEach(btn => {
            btn.addEventListener('click', inputNum(e));
        });

        opButtons.forEach(btn => {
            btn.addEventListener('click', inputOp(e));
            btn.addEventListener('click', switchScreen())
        })

        viewButtons.forEach(btn => {
            btn.addEventListener('click', function(){
                if (e.target.id === 'clear-btn'){
                    clearDisplay();
                } else if (e.target.id === 'backspace=btn'){
                    clearEntry();
                }
            })
        })

        equalsButton.addEventListener('click', calculate());
        dotButton.addEventListener('click', addDot());
        switchButton.addEventListener('click', changeSign());

    }