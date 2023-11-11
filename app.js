//sets required packages
const inquirer = require("inquirer");
const art = require("./src/ascii");
const index = require("./src/index");

//starts the srt function for when start
const startEmployeeTracker = () => {
  art();
  setTimeout(() => {
    promptInquirer();
  }, 1550);
};

//sets a timer of 500 milli
const recallPrompt = () => {
  setTimeout(() => {
    promptInquirer();
  }, 500);
};

//promts inquirer
const promptInquirer = async () => {
  try {
    const data = await inquirer.prompt({
      name: "main",
      message: "What command would you like to perform?",
      type: "list",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Remove a Department", //bonus
        "Remove a Role", //bonus
        "Remove an Employee", //bonus
        "Update an Employee Role",
        "Update Employee Managers", //bonus
        "View Employees By Manager", //bonus
        "View Employees By Department", //bonus
        "View Total Utilized Budget of the Department", //bonus
        "Quit",
      ], // after help was even able to add bonus options 😱
    });

    const { main } = data;

    // "Switch" statment to promt
    switch (main) {
      case "View All Departments":
        index.viewDeparts().then(recallPrompt);
        break;
      case "View All Roles":
        index.viewRoles().then(recallPrompt);
        break;
      case "View All Employees":
        index.viewEmpl().then(recallPrompt);
        break;
      case "Add a Department":
        index.addDept().then(recallPrompt);
        break;
      case "Add a Role":
        index.addRole().then(recallPrompt);
        break;
      case "Add an Employee":
        index.addEmpl().then(recallPrompt);
        break;
      case "Remove a Department":
        index.removeDept().then(recallPrompt);
        break;
      case "Remove a Role":
        index.removeRole().then(recallPrompt);
        break;
      case "Remove an Employee":
        index.removeEmpl().then(recallPrompt);
        break;
      case "Update an Employee Role":
        index.updateRole().then(recallPrompt);
        break;
      case "Update Employee Managers":
        index.updateManager().then(recallPrompt);
        break;
      case "View Employees By Manager":
        index.viewByManager().then(recallPrompt);
        break;
      case "View Employees By Department":
        index.viewByDept().then(recallPrompt);
        break;
      case "View Total Utilized Budget of the Department":
        index.viewBudget().then(recallPrompt);
        break;
      case "Quit":
        console.log("You have quit the program.");
        process.exit(0);
    }
  } catch (err) {
    console.log(err);
  }
};

startEmployeeTracker();

module.exports = recallPrompt;
