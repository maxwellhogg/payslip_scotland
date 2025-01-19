"use strict";

const employeeName = `Maxwell Hogg`; //document.querySelector(`.name`).value;
const hourlyRate = 14;
const hours = 40;
const annualSalary = (hourlyRate * hours) * 52;
const topLineMonthly = annualSalary / 12;
const topLineWeekly = annualSalary / 52;
const payFreq = `monthly`;
const natIns = 0.08;
const pensionCont = 0.05;
const blind = false;
const studentLoan = true;

const calcScottishTax = function (salary) {
    const taxBands = [
        // ------------ TAX BRACKETS ----------------- >
        { lowerLimit: 0, upperLimit: 12570, rate: 0 }, // Personal Allowance
        { lowerLimit: 12571, upperLimit: 14876, rate: 0.19 }, // Starter Rate
        { lowerLimit: 14877, upperLimit: 26561, rate: 0.2 }, // Basic Rate
        { lowerLimit: 26562, upperLimit: 43662, rate: 0.21 }, // Intermediate Rate
        { lowerLimit: 43663, upperLimit: 75000, rate: 0.42 }, // Higher Rate
        { lowerLimit: 75001, upperLimit: 125140, rate: 0.45 }, // Advanced Rate
        { lowerLimit: 125141, upperLimit: Infinity, rate: 0.48 }, // Top Rate
    ];
  
    let totalTax = 0;
  
    for (let band of taxBands) {
        if (salary > band.lowerLimit) {
            const taxableIncome = Math.min(salary, band.upperLimit) - band.lowerLimit;
            totalTax += taxableIncome * band.rate;
        } else {
            break;
        }
    }
  
    return totalTax.toFixed(2);
}

const calcNatIns = function (salary) {
    const natInsDeduct = salary * natIns;
    return natInsDeduct.toFixed(2);
}

const calcPension = function (salary) {
    const pensionDeduct = salary * pensionCont;
    return pensionDeduct.toFixed(2);
}

const calculateStudentLoanRepayment = function (annualSalary, wasStudent) {
    const repaymentThreshold = 31395;
    const repaymentRate = 0.09;

    if (!wasStudent) {
        return 0;
    }

    if (annualSalary <= repaymentThreshold) {
        return 0;
    }

    const incomeAboveThreshold = annualSalary - repaymentThreshold;
    const repaymentAmount = incomeAboveThreshold * repaymentRate;

    return repaymentAmount.toFixed(2);
}

const calculateFinalSalary = function () {
    const finalSalary = annualSalary - calculateStudentLoanRepayment(annualSalary, studentLoan) - calcPension(annualSalary) - calcNatIns(annualSalary) - calcScottishTax(annualSalary);
    return finalSalary.toFixed(2);
}

const calculateMonthlyPay = function () {
    const monthlyPay = calculateFinalSalary() / 12;
    return monthlyPay.toFixed(2);
}

const calculateWeeklyPay = function () {
    const weeklyPay = calculateFinalSalary() / 52;
    return weeklyPay.toFixed(2);
}

console.log(`${employeeName}'s Total tax on an annual salary of £${annualSalary} is £${calcScottishTax(annualSalary)}.`);
console.log(`${employeeName} will pay £${calcNatIns(annualSalary)} in yearly National Insurance contributions.`);
console.log(`${employeeName} will pay £${calcPension(annualSalary)} towards a pension fund.`);
console.log(`${employeeName}'s student loan repayment amounts to £${calculateStudentLoanRepayment(annualSalary, studentLoan)}`);
console.log(`Final salary: ${calculateFinalSalary()}`);
console.log(`Monthly pay: £${calculateMonthlyPay()}`);
console.log(`Weekly pay: £${calculateWeeklyPay()}`);

