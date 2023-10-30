const inquirer = require("inquirer");
const index = require("./src/index");

const startEmployeeTracker = async () => {
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
        "Update an Employee Role",
        "Quit",
      ],
    });

    const { main } = data;

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
      case "Update an Employee Role":
        index.updateRole().then(recallPrompt);
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
