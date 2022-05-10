const inputTotalBill = document.querySelector('#bill')
const inputTotalPeopleNumber = document.querySelector('#people-number')

const btnsTipValue = document.querySelectorAll('.tip-btn')
const inputCustomTipValue = document.querySelector('#tip')

const btnSplit = document.querySelector('.split-btn')
const btnReset = document.querySelector('.reset-btn')

const resultTipPerPerson = document.querySelector('.tip-result')
const resultBillPerPerson = document.querySelector('.total-result')

let selectedTipValue = 0

window.addEventListener('load', () => {
    document.querySelector('form').reset()
})

btnsTipValue.forEach((btnTipValue) => {
    btnTipValue.addEventListener('click', (e) => {
        e.preventDefault()
        inputCustomTipValue.value = ''

        btnsTipValue.forEach((btn) => {
            if (btnTipValue !== btn) {
                btn.classList.remove('selected')
            }
        })
        btnTipValue.classList.add('selected')
        selectedTipValue = btnTipValue.dataset.tip
    })
})

inputCustomTipValue.addEventListener('click', () => {
    selectedTipValue = 0
    btnsTipValue.forEach((btn) => {
        btn.classList.remove('selected')
    })
})

btnReset.addEventListener('click', () => {
    btnsTipValue.forEach((btn) => {
        btn.classList.remove('selected')
    })
    inputTotalPeopleNumber.parentElement.classList.remove('invalid')
    selectedTipValue = 0
    resultTipPerPerson.textContent = '$0.00'
    resultBillPerPerson.textContent = '$0.00'
})

btnSplit.addEventListener('click', (e) => {
    e.preventDefault()

    const billVal = inputTotalBill.value
    const customTipVal = inputCustomTipValue.value
    const peopleNum = inputTotalPeopleNumber.value

    inputTotalPeopleNumber.parentElement.classList.remove('invalid')

    if (isInputValid(billVal) && isInputValid(customTipVal) && isInputValid(peopleNum)) {
        if (parseInt(peopleNum) == 0) {
            inputTotalPeopleNumber.parentElement.classList.add('invalid')
            return
        }
        if (customTipVal !== '') {
            selectedTipValue = customTipVal
        }

        calculate(billVal, selectedTipValue, peopleNum)
    } else {
        selectedTipValue = 0
        document.querySelector('form').reset()
    }
})

function calculate(bill, tip, number) {
    const res1 = Number(parseFloat(bill / number) * (tip / 100)).toFixed(2)
    const res2 = Number(parseFloat(bill / number)).toFixed(2)

    if (isNaN(res1) || isNaN(res2)) {
        document.querySelector('form').reset()
    } else if (res1 === 'Infinity' || res1 === 'Infinity') {
        inputTotalPeopleNumber.parentElement.classList.add('invalid')
        return
    } else {
        resultTipPerPerson.textContent = `$${res1}`
        resultBillPerPerson.textContent = `$${res2}`
    }
}

function isInputValid(item) {
    if (item === '' || isInputPositiveNumber(item)) {
        return true
    } else {
        return false
    }
}
function isInputPositiveNumber(item) {
    return /^[0-9]+[0-9]*$/.test(item)
}
