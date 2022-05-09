//DOM stuff
const main_view = document.querySelector('#main-view');
const upper_view = document.querySelector('#upper-view');
const viewButtons = document.querySelectorAll('.viewButton');
const numButtons = document.querySelectorAll('.numButton');
const opButtons = document.querySelectorAll('.opButton');

//math stuff
let num1;
let num2;
let currOperator;
let result;
let activeOp = false;
let operated = false;

//view stuff
let main = []; //array for main view
let upper = []; //array for upper view

main_view.textContent = main.join('');
upper_view.textContent = upper.join('');

//operations

function operate(num1, num2, operator){
    switch(operator){
        case '+':
            result =  num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2
            break;
        case '^':
            result = num ** num2;
        default:
            return;
    }
    
    operated = true;
    return result;
}

//clear function
function clear(){
    main_view.innerHTML = '';
    upper_view.innerHTML = '';
}

//backspace function
function backspace(){

}

function switchView(){
    if (activeOp){
        upper = '';
        upper.push(result);
    }
}


for (num in numButtons){
    num.addEventListener('click', function(e) {
        if (operated){
            upper.push(result);
        }
        
        if (activeOp){
            upper.push(num1); //push num 1 to upper if operation is active
        }

        main.push(e.target.id);
    })
}


for (op in opButtons){
    op.addEventListener('click', function (e) {
        if (!activeOp){
            activeOp = true;
            main.push(e.target.id)
        }

        if (e.target.id === '÷'){
            currOperator = '/';
        } else if (e.target.id === 'x'){
            currOperator = '*';
        } else {
        currOperator = e.target.id;
        }

        if (e.target.id === '='){
            operate(num1, num2, currOperator);
            activeOp = false;
        }

        activeOp = true;

        //upon entry the array should take everything up until that point and set it to num1
    })
}

//function to update number

/* 
    function updateView(e){

    }
*/
