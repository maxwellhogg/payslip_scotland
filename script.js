"use strict";

// ----------- UK PAYSLIP APP ------------- >

// An app that calculates an employees take home pay based on the scottish tax system
// Can be used as a calculator to show potential earnings and assist with salary negotiation 
// The app must store an employees name, yearly salary, pay frequency, tax brackets and whethere or not they are blind as variables.

const employeeName = `John Smith`;
const employeeSalary = 36000;
const salaryDeducted = ``;
const payFreq = `weekly`;
const personalAllowance = 12570;
const blind = false;
const natIns = 0.8;
const studentLoan = `Plan A`;

// ------------ TAX BRACKETS ----------------- >

// Requires a function to calculate how much tax is deducted per bracket
// May have to break up the emplyoyeeSalary variable in to smaller variables and deduct per section

// Requires national insurance deduction

// Requires pension contribution deduction

// requires student loan deduction (PLAN BASED)

// Requires a function for calculating weekly pay and a function for calculating monthly pay

// Run either the weekly pay function or the monthly pay function
// if (payFreq === `weekly`) (weeklyPay();) else {monthlyPay}

if (payFreq === `weekly`) {
    let paidWeekly = weeklyPay();
    console.log(paidWeekly());
} else {
    let paidMonthly = monthlyPay();
    console.log(paidMonthly());
}

// ------------ TAX BRACKETS ----------------- >
