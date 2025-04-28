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
    let loanNumber = parseInt(loanInputElement.value);
    let termNumber = parseInt(termInputElement.value);
    let interestNumber = parseInt(interestInputElement.value);


    // calculate numbers
    let resultCal = calculateNumbers(loanNumber, termNumber, interestNumber);


    // display the generated numbers
    displayNumbers(resultCal);


    let resultsTable = generateAmortTable(loanNumber, termNumber, interestNumber);

    displayAmortTable(schedule);



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

    document.getElementById('monthlyPayment').innerText = results.monthlyPayment.toFixed(2);
    document.getElementById('total-principal').innerText = results.totalPrincipal.toFixed(2);
    document.getElementById('total-interest').innerText = results.totalInterest.toFixed(2);
    document.getElementById('total-cost').innerText = results.totalPayment.toFixed(2);

}


function generateAmortTable(loanNumber, termNumber, interestNumber) {
    let monthlyRate = interestNumber / 1200;
    let monthlyPayment = loanNumber * monthlyRate / (1 - (1 + monthlyRate) ** (-termNumber));

    let balance = loanNumber;
    let totalInterestPaid = 0;
    let schedule = [];

    for (let month = 1; month <= termNumber; month++) {
        let interestPayment = balance * monthlyRate;
        let principalPayment = monthlyPayment - interestPayment;
        totalInterestPaid += interestPayment;
        balance -= principalPayment;

        // Fix rounding issues on final payment
        if (balance < 0) balance = 0;

        schedule.push({
            month: month,
            payment: monthlyPayment,
            principal: principalPayment,
            interest: interestPayment,
            totalInterest: totalInterestPaid,
            balance: balance
        });
    }

    return schedule;
}


function displayAmortTable(loanNumber, termNumber, interestNumber) {
    let tableBody = document.getElementById('amort-table');
    let template = document.getElementById('payment-row-template');

    tableBody.innerHTML = ''; // Clear previous entries


}
