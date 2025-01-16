"use strict";

// ----------- SCOTTISH PAYSLIP APP ------------- >

// An app that calculates an employees take home pay based on the scottish tax system
// Can be used as a calculator to show potential earnings and assist with salary negotiation 

const employeeName = `Maxwell Hogg`;
const annualSalary = 25656; // Change this value to test with different salaries
const payFreq = `monthly`;
const natIns = 0.08;
const pensionCont = 0.05;
const blind = false;
const studentLoan = true;

// Requires a function to calculate how much tax is deducted per bracket

function calcScottishTax(salary) {
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
  
    return totalTax;
}

// Requires national insurance deduction

function calcNatIns(salary) {
    const natInsDeduct = salary * natIns;
    return natInsDeduct;
}

// Requires pension contribution deduction

function calcPension(salary) {
    const pensionDeduct = salary * pensionCont;
    return pensionDeduct;
}

// requires student loan deduction (PLAN 4 BASED)

function calculateStudentLoanRepayment(annualSalary, wasStudent) {
    const repaymentThreshold = 31395;
    const repaymentRate = 0.09;

    if (!wasStudent) {
        return 0; // No repayment required if the employee was never a student
    }

    if (annualSalary <= repaymentThreshold) {
        return 0; // No repayment required if salary is below the threshold
    }

    const incomeAboveThreshold = annualSalary - repaymentThreshold;
    const repaymentAmount = incomeAboveThreshold * repaymentRate;

    return repaymentAmount;
}

// requires a function to deduct all deductions from annualSalary

// Requires a function for calculating weekly pay and a function for calculating monthly pay

// Run either the weekly pay function or the monthly pay function
// if (payFreq === `weekly`) (weeklyPay();) else {monthlyPay}

// if (payFreq === `weekly`) {
//     let paidWeekly = weeklyPay();
//     console.log(paidWeekly());
// } else {
//     let paidMonthly = monthlyPay();
//     console.log(paidMonthly());
// }

// Console output to test results
console.log(`${employeeName}'s Total tax on an annual salary of £${annualSalary} is £${calcScottishTax(annualSalary).toFixed(2)}.`);
console.log(`${employeeName} will pay £${calcNatIns(annualSalary).toFixed(2)} in yearly National Insurance contributions.`);
console.log(`${employeeName} will pay £${calcPension(annualSalary).toFixed(2)} towards a pension fund.`);
console.log(`${employeeName}'s student loan repayment amounts to £${calculateStudentLoanRepayment(annualSalary, studentLoan).toFixed(2)}`);