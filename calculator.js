const currentOperandElement = document.querySelector('[data-current-operand]');
const previousOperandElement = document.querySelector('[data-previous-operand]');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
let saved = '';
ops = '';
minusFlag = false;
negNumflag = false;

class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear()
    }

    delete() {
        this.currentOperand = this.currentOperand.tostring().slice(0, -1);
    }
    
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + (number).toString()
        saved += number;

        let operationx;
        console.log('saved:', saved)
 
        if (Number.isNaN(saved.slice(-1))) {
            console.log(Number.isNaN(saved.slice(-1)))
        }
            if (isNaN(saved.slice(-3, -2)) && isNaN(saved.slice(-2, -1))) {
                console.log('two ops')
                console.log(saved)
                console.log(saved.slice(-3, -2))
                console.log(saved.slice(-2, -1))
                if (saved.slice(-2, -1) == '-') {
                    console.log('last -ve')
                    this.operation = saved.slice(-3, -2);
                    this.currentOperand = '-' + this.currentOperand;
                    console.log(this.currentOperand)
                } else {
                    this.operation = saved.slice(-2, -1);
                }
                console.log('operationX', this.operation)
            }
        
    }
    
    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    chooseOperation(operation) {
        saved += operation;

        if (this.currentOperand === '') return

        if (this.previousOperand != '') {
            this.compute()
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        
    }
    
    compute() {
        
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                console.log('case +')
                computation = prev + current
                break;
            case '-':
                console.log('case -')
                computation = prev - current
                break;
            case '*':
                console.log('case *')
                computation = prev * current
                break;
            case '÷':
                console.log('case ÷')
                computation = prev / current
                break;
            default:
                return
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    clearDisplay() {
        this.currentOperandElement.innerText = 0;
        this.previousOperandElement.innerText = '';
    }
    
    updateDisplay() {
        console.log('UDD p',this.previousOperand,'c', this.currentOperand,'ops',this.operation)
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandElement.innerText = `${this.getDisplayNumber(this.previousOperand)}${this.operation}`
        } else {
            this.previousOperandElement.innerText = ''
        }

    }
    getDisplayNumber(number) {

        const stringNumber = number.toString() // for splitting on decimal characters inside it.
        const integerDigits = parseFloat(stringNumber.split('.')[0]) // turning a string to an array.
        const decimalDigits = stringNumber.split('.')[1] // getting second portion out of the array, which is number after decimal place.
        let integerDisplay

        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 }) // "en" in the localeString means : english.
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
}

const calculator = new Calculator(previousOperandElement, currentOperandElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    // savedOps clear
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.clearDisplay()
    // calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})



