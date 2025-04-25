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