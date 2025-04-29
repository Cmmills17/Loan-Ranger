// get the amounts entered in input
function getValues() {
    // find the id of the element
    // Loan Input
    let loanInputElement = document.getElementById('loanInput');

    // Term Input
    let termInputElement = document.getElementById('termInput');

    // Interest Input
    let interestInputElement = document.getElementById('interestInput');

    // get what the user put into the input
    let loanNumber = parseFloat(loanInputElement.value);
    let termNumber = parseInt(termInputElement.value);
    let interestNumber = parseFloat(interestInputElement.value);

    //validate
    if (Number.isNaN(loanNumber) || Number.isNaN(termNumber) || Number.isNaN(interestNumber)
        || loanNumber < 0 || termNumber < 0 || interestNumber < 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: 'Ypur loan details appear to be invalid. Please double check your inputs.'
        })

    } else {
        // calculate numbers
        let resultCal = calculateNumbers(loanNumber, termNumber, interestNumber);

        // display the generated numbers
        displayNumbers(resultCal);

        let payments = calculatePayments(loanNumber, termNumber, interestNumber);

        displayPayments(payments);
    }
}





// Calculate the user's input
function calculateNumbers(loanNumber, termNumber, interestNumber) {
    // Monthly interest rate
    let monthlyRate = interestNumber / 1200;

    // Monthly Payment
    let monthlyPayment = loanNumber * monthlyRate / (1 - (1 + monthlyRate) ** (-termNumber));

    // Total payment over the term
    let totalPayment = monthlyPayment * termNumber;

    // Total interest paid
    let totalInterest = totalPayment - loanNumber;

    let result = {
        monthlyPayment: monthlyPayment,
        totalPrincipal: loanNumber,
        totalPayment: totalPayment,
        totalInterest: totalInterest
    };

    return result;
}

//display the results of the users input
function displayNumbers(results) {
    let formatOptions = {
        style: 'currency',
        currency: 'USD'
    }


    document.getElementById('monthlyPayment').innerText = results.monthlyPayment.toLocaleString('en-US', formatOptions);
    document.getElementById('total-principal').innerText = results.totalPrincipal.toLocaleString('en-US', formatOptions);
    document.getElementById('total-interest').innerText = results.totalInterest.toLocaleString('en-US', formatOptions);
    document.getElementById('total-cost').innerText = results.totalPayment.toLocaleString('en-US', formatOptions);

}

function calculatePayments(loanNumber, termNumber, interestNumber) {
    let monthlyRate = interestNumber / 1200;
    let monthlyPayment = loanNumber * monthlyRate / (1 - (1 + monthlyRate) ** (-termNumber));

    let balance = loanNumber;
    let totalInterestPaid = 0;
    // New array to put into tr
    let payments = [];

    for (let month = 1; month <= termNumber; month++) {

        let interestPayment = balance * monthlyRate;
        let principalPayment = monthlyPayment - interestPayment;

        totalInterestPaid += interestPayment;

        balance -= principalPayment;

        if (balance < 0) {
            balance = 0
        }

        let payment = {
            month: month,
            payment: monthlyPayment,
            principal: principalPayment,
            interest: interestPayment,
            totalInterest: totalInterestPaid,
            balance: balance
        };
        payments.push(payment)
    }

    return payments;
}

function displayPayments(paymentsArr) {

    let tableRowTemplate = document.getElementById('payment-row-template');

    let paymentsTable = document.getElementById('payments-table');
    paymentsTable.innerHTML = '';

    let formatOptions = {
        style: 'currency',
        currency: 'USD'
    }

    for (let i = 0; i < paymentsArr.length; i++) {

        let monthlyPayment = paymentsArr[i];

        let tableRowEl = tableRowTemplate.content.cloneNode(true);

        let monthTd = tableRowEl.querySelector('.pay-month');
        monthTd.innerText = monthlyPayment.month;

        let paymentTd = tableRowEl.querySelector('.pay-payment');
        paymentTd.innerText = monthlyPayment.payment.toLocaleString('en-US', formatOptions);

        let principalTd = tableRowEl.querySelector('.pay-principal');
        principalTd.innerText = monthlyPayment.principal.toLocaleString('en-US', formatOptions);


        let interestTd = tableRowEl.querySelector('.pay-interest');
        interestTd.innerText = monthlyPayment.interest.toLocaleString('en-US', formatOptions)


        let totalInterestTd = tableRowEl.querySelector('.pay-total-interest');
        totalInterestTd.innerText = monthlyPayment.totalInterest.toLocaleString('en-US', formatOptions);
        ;

        let balanceTd = tableRowEl.querySelector('.pay-balance');
        balanceTd.innerText = monthlyPayment.balance.toLocaleString('en-US', formatOptions);

        paymentsTable.appendChild(tableRowEl);
    }
}