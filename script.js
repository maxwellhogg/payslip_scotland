"use strict";

document.querySelector(`.submit-button`).addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission refresh

    let hourlyRate = parseFloat(document.querySelector(`#rate`).value) || 0;
    let hours = parseFloat(document.querySelector(`#hours`).value) || 0;
    let pensionCont = parseFloat(document.querySelector(`#pension`).value) / 100 || 0;
    let studentLoan = document.querySelector(`#student`).value === "yes";
    
    let annualSalary = (hourlyRate * hours) * 52;
    let topLineMonthly = annualSalary / 12;
    let topLineWeekly = annualSalary / 52;
    let natIns = 0.08;

    const calcScottishTax = function (salary) {
        const taxBands = [
            { lowerLimit: 0, upperLimit: 12570, rate: 0 },
            { lowerLimit: 12571, upperLimit: 14876, rate: 0.19 },
            { lowerLimit: 14877, upperLimit: 26561, rate: 0.2 },
            { lowerLimit: 26562, upperLimit: 43662, rate: 0.21 },
            { lowerLimit: 43663, upperLimit: 75000, rate: 0.42 },
            { lowerLimit: 75001, upperLimit: 125140, rate: 0.45 },
            { lowerLimit: 125141, upperLimit: Infinity, rate: 0.48 },
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
    };

    const calcNatIns = (salary) => salary * natIns;
    const calcPension = (salary) => salary * pensionCont;

    const calculateStudentLoanRepayment = function (annualSalary, wasStudent) {
        const repaymentThreshold = 31395;
        const repaymentRate = 0.09;

        if (!wasStudent || annualSalary <= repaymentThreshold) {
            return 0;
        }

        return (annualSalary - repaymentThreshold) * repaymentRate;
    };

    const calculateFinalSalary = function () {
        return annualSalary - calcScottishTax(annualSalary) - calcNatIns(annualSalary) - calcPension(annualSalary) - calculateStudentLoanRepayment(annualSalary, studentLoan);
    };

    let finalSalary = calculateFinalSalary();
    let monthlyPay = finalSalary / 12;
    let weeklyPay = finalSalary / 52;
    let annualPension = calcPension(annualSalary);

    // Update table
    document.querySelector("#annual-salary").textContent = `£${annualSalary.toFixed(2)}`;
    document.querySelector("#hourly-rate").textContent = `£${hourlyRate.toFixed(2)}`;
    document.querySelector("#weekly-hours").textContent = hours;
    document.querySelector("#income-tax").textContent = `£${calcScottishTax(annualSalary).toFixed(2)}`;
    document.querySelector("#national-insurance").textContent = `£${calcNatIns(annualSalary).toFixed(2)}`;
    document.querySelector("#student-loan").textContent = `£${calculateStudentLoanRepayment(annualSalary, studentLoan).toFixed(2)}`;
    document.querySelector("#weekly-before").textContent = `£${topLineWeekly.toFixed(2)}`;
    document.querySelector("#weekly-after").textContent = `£${weeklyPay.toFixed(2)}`;
    document.querySelector("#monthly-after").textContent = `£${monthlyPay.toFixed(2)}`;
    document.querySelector("#annual-pension").textContent = `£${annualPension.toFixed(2)}`;
    document.querySelector("#monthly-before").textContent = `£${topLineMonthly.toFixed(2)}`;
});

// Toggle light and dark
document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "DARK";
    toggleButton.classList.add("dark-mode-toggle");
    document.body.appendChild(toggleButton);

    toggleButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            toggleButton.textContent = "LIGHT";
        } else {
            toggleButton.textContent = "DARK";
        }
    });
});


