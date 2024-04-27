#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(
  chalk.cyanBright.underline `-- Welcome to Student Management System-2024 (Admissions Open) -- `
);

const randomNumber: number = Math.floor(10000 + Math.random() * 90000);

let myBalance: number = 0;

let answer = await inquirer.prompt([
  {
    name: "students",
    type: "input",
    message: "Please Enter Student Name: ",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return "Please Don't leave the input Empty !";
    },
  },

  {
    name: "courses",
    type: "list",
    message: "Select the Courses You Want to Enrolled In",
    choices: [
      "Python",
      "Artificial Intelligence",
      "TypeScript",
      "Web-Designing",
      "Cloud Computing",
    ],
  },
]);

const tutionFee: { [key: string]: number } = {
  "Python": 2000,
  "Artificial Intelligence": 10000,
  "TypeScript": 5000,
  "Web-Designing": 6000,
  "Cloud Computing": 8000,
};

console.log(chalk.yellowBright `Tution Fee: ${tutionFee[answer.courses]} `);
console.log(chalk.greenBright `Balance: ${myBalance}`);

let paymentType = await inquirer.prompt([
  {
    name: "payment",
    type: "list",
    message: "Select Payment Method",
    choices: ["Bank Transfer", "Payoneer", "Fonepay"],
  },

  {
    name: "amount",
    type: "input",
    message: "Transfer Money",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return "You have Left the Empty Input !";
    },
  },
]);

console.log(
  chalk.bold.redBright`You have Selected the Payment Method :${paymentType.payment}`
);

const tutionFees = tutionFee[answer.courses];

const paymentAmount = parseFloat(paymentType.amount);

if (tutionFees === paymentAmount) {
    console.log(chalk.yellow.bold.underline `Congratulations, You Have Successfully Enrolled in course${answer.courses}.`
  );

  let ans = await inquirer.prompt([
    {
      name: "select",
      type: "list",
      message: "What would you like to do next ?",
      choices: ["View Status", "Exit"],
    },
  ]);

  if (ans.select === "View Status") {
    console.log(chalk.bold.italic.cyanBright.underline`\n -- Student Status -- \n`);
    console.log(chalk.bold.italic.yellow `Student Name: ${answer.students}`);
    console.log(chalk.bold.italic.yellow  `Student ID: ${randomNumber}`);
    console.log(chalk.bold.italic.yellow `Course: ${answer.courses}`);
    console.log(chalk.bold.italic.yellow `Tution Fee Paid: ${paymentAmount}`);
    console.log(chalk.bold.italic.yellow `Balance: ${(myBalance += paymentAmount)}`);
  } else {
    console.log(chalk.red`Exit !! Thanks for Using Student Management System.`);
  }
} else {
  console.log(chalk.red`Invalid Amount !!`);
}
