var displayScreenSecond = document.getElementById('screen1');
var displayScreen = document.getElementById('screen');

var buttonEq = document.getElementById('equals');
var buttonDel = document.getElementById('btnDel')
var buttonClear = document.getElementById('clear');

let displayValue = '';
let saveValue = '';
let operator = undefined;
let number = '';
let key = '';
let reset = false;

function clear(){
    displayScreen.textContent = '';
    displayScreenSecond.textContent = '';
    displayValue = '';
    saveValue = '';
    operator = undefined
};
function deleteNumber(){
    displayValue = displayValue.toString().slice(0, -1)
};
function operation(){
    if (displayValue === "") return
    if (saveValue !== "") {
        execute();
    }
    operator = operator;
    saveValue = displayValue;
    displayValue = '';
};
function execute(){
    var compute;
    const prev = saveValue;
    const current = displayValue;
    if(isNaN(prev) || isNaN(current)) return

    switch(operator){
        case '+':
            compute = parseFloat(prev) + parseFloat(current);
            break;
        case '-':
            compute = parseFloat(prev) - parseFloat(current);
            break;
        case '*':
            compute = parseFloat(prev) * parseFloat(current);
            break;
        case '/':
            compute = parseFloat(prev) / parseFloat(current);
            break;   
        default:
            return;     
    }
    reset = true;
    displayValue = compute;
    operator = operator;
    saveValue = '';
};
function appendNumber(number){
    if(number === '.' && displayValue.includes('.')) return
    if(displayValue.length >= 9 ) {
        displayValue.substring(0,9)
    }
    else displayValue = displayValue.toString() + number.toString(); 
};
function getDisplayNumber (number){
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if(isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if(decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } 
    else {
      return integerDisplay;
    }
};
function checkKey(){
if(key > 47 && key < 58 || key === 46){
    switch(key){
        case 46:
            key = '.'
            break;
        case 49:
            key = '1'
            break;
        case 50:
            key = '2'
            break;
        case 51:
            key = '3'
            break;
        case 52:
            key = '4'
            break;
        case 53:
            key = '5'
            break;
        case 54:
            key = '6'
            break;
        case 55:
            key = '7'
            break;
        case 56:
            key = '8'
            break;
        case 57:
            key = '9'
            break;
        case 48:
            key = '0'
            break;
        default:
            return;
    }
    if(saveValue === '' && displayValue !== '' && reset === true){
        displayValue = '';
        reset = false;
    }
    return key;
}
else 
    return key = '';
};
function updateScreen(){
    displayScreen.textContent = getDisplayNumber(displayValue);
    
    if (operator != null && saveValue!='') {
        displayScreenSecond.textContent = 
        `${getDisplayNumber(saveValue)}${operator}`
    }else 
        displayScreenSecond.textContent = "";
};
document.querySelectorAll('.btn').forEach((buttonNumbers) => {
    buttonNumbers.addEventListener('click',() => {
    if(saveValue === '' && displayValue !== '' && reset){
        displayValue = '';
        reset = false;
    }
    number = buttonNumbers.value;
    appendNumber(number)
    updateScreen();                   
    })
});
document.querySelectorAll('.btnOp').forEach((buttonOperators) => {
    buttonOperators.addEventListener('click', () => {

    operation(operator)
    operator = buttonOperators.value;           
    updateScreen();           
    })
});
document.addEventListener('keypress', (element) => {
    key = element.keyCode;
    switch(key){
        case 43:
            operation(operator);
            operator = '+';
            key = '';
            updateScreen();
            break;
        case 45:
            operation(operator);
            operator = '-';
            key = '';
            updateScreen();
            break;
        case 42:
            operation(operator);
            operator = '*';
            key = '';
            updateScreen();
            break;
        case 47:
            operation(operator);
            operator = '/';
            key = '';
            updateScreen();
            break; 
        case 61:
            execute();
            updateScreen();
            break;
        case 99:
            clear()
            updateScreen();
        case 32:
            deleteNumber();
            updateScreen();
            break;
    }
    number = checkKey(key);
    appendNumber(number)
    updateScreen();  
});
buttonEq.addEventListener('click', button  => {
    execute();
    updateScreen();       
});
buttonClear.addEventListener('click', button => {
    clear()
    updateScreen();
});
buttonDel.addEventListener('click', button => {
    deleteNumber();
    updateScreen();
});




