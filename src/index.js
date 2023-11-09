const inquirer = require("inquirer");
const mysql = require("mysql2");

// cpnectipon works
const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "Ringo-004",
    database: "tracker_db",
  })
  .promise();

// views departments
const viewDeparts = async () => {
  const [rows] = await pool.query("SELECT * FROM department;");
  console.table(rows);
};

// views roles
const viewRoles = async () => {
  let query = `
    SELECT  r.id,
            r.title,
            r.salary,
            r.department_id,
            d.name
    FROM role r
    JOIN department d ON r.department_id = d.id;
  `;

  const [rows] = await pool.query(query);
  console.table(rows);
};

//views empkoyees
const viewEmpl = async () => {
  let query = `
    SELECT  e.id,
            e.first_name,
            e.last_name,
            e.manager_id,
            r.title,
            r.salary,
            d.name
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    ORDER BY e.id;
  `;

  const [rows] = await pool.query(query);
  console.table(rows);
};

//+dep
const addDept = async () => {
  try {
    const dept = await inquirer.prompt({
      name: "deptAdded",
      type: "input",
      message: "Name of the department:",
      validate: (name) => {
        return name
          ? true
          : console.log("Enter a name for the new department:", false);
      },
    });
    const { deptAdded } = dept;

    await pool.query(
      `
        INSERT INTO department (name) 
        VALUES (?)`,
      [deptAdded]
    );
    return viewDeparts();
  } catch (err) {
    console.log(err);
  }
};

//+role
const addRole = async () => {
  try {
    const [departments] = await pool.query(`SELECT * FROM department;`);
    const deptName = departments
      .map((dept) => dept.name)
      .filter((arr) => arr != null);

    const role = await inquirer.prompt([
      {
        name: "roleTitle",
        type: "input",
        message: "Title of the role:",
        validate: (title) => {
          return title
            ? true
            : console.log("Enter a title for the new role:", false);
        },
      },
      {
        name: "roleSalary",
        type: "input",
        message: "Salary of the role:",
        validate: (salary) => {
          return salary
            ? true
            : console.log("Enter a salary for the new role:", false);
        },
      },
      {
        name: "roleDeptName",
        type: "list",
        message: "Which department does the new role belongs to?",
        choices: [...deptName],
      },
    ]);
    const { roleTitle, roleSalary, roleDeptName } = role;

    const selectedDept = departments.find((dept) => dept.name === roleDeptName);
    const roleDeptId = selectedDept.id;

    await pool.query(
      `INSERT INTO role (title, salary, department_id) 
      VALUES (?, ?, ?)`,
      [roleTitle, roleSalary, roleDeptId]
    );
    return await viewRoles();
  } catch (err) {
    console.log(err);
  }
};

//+employee
const addEmpl = async () => {
  try {
    const [roles] = await pool.query(`SELECT * FROM role;`);
    const roleTitle = roles
      .map((role) => role.title)
      .filter((arr) => arr != null);

    const [managers] = await pool.query(`SELECT * FROM employee;`);
    const managerName = managers.map(
      (name) => `${name.first_name} ${name.last_name}`
    );

    const employee = await inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "First name of the employee:",
        validate: (first) => {
          return first
            ? true
            : console.log("Enter a first name for the employee", false);
        },
      },
      {
        name: "lastName",
        type: "input",
        message: "Last name of the employee:",
        validate: (last) => {
          return last
            ? true
            : console.log("Enter a last name for the employee", false);
        },
      },
      {
        name: "employeeRole",
        type: "list",
        message: "What is the employee's role?",
        choices: [...roleTitle],
      },
      {
        name: "employeeManager",
        type: "list",
        message: "Who is the employee's manager?",
        choices: [...managerName],
      },
    ]);
    const { firstName, lastName, employeeRole, employeeManager } = employee;

    const selectedRole = roles.find((role) => role.title === employeeRole);
    const roleId = selectedRole.id;

    const selectedManager = managers.find(
      (manager) =>
        `${manager.first_name} ${manager.last_name}` === employeeManager
    );
    const managerId = selectedManager.id;

    await pool.query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
      VALUES (?, ?, ?, ?)`,
      [firstName, lastName, roleId, managerId]
    );
    return await viewEmpl();
  } catch (err) {
    console.log(err);
  }
};

//update
const updateRole = async () => {
  try {
    const [employeeNames] = await pool.query(`SELECT * FROM employee;`);
    const selectEmployee = employeeNames.map(
      (names) => `${names.first_name} ${names.last_name}`
    );

    const [employeeRoles] = await pool.query(`SELECT * FROM role;`);
    const selectRole = employeeRoles
      .map((role) => role.title)
      .filter((arr) => arr != null);

    const data = await inquirer.prompt([
      {
        name: "updateEmployee",
        type: "list",
        message: "Which employee's role do you want to update?",
        choices: [...selectEmployee],
      },
      {
        name: "updateRole",
        type: "list",
        message: "Which role do you want to assign to the selected employee?",
        choices: [...selectRole],
      },
    ]);
    const { updateEmployee, updateRole } = data;

    const updateRoleId = employeeRoles.find(
      (role) => role.title === updateRole
    );
    const { id } = updateRoleId;

    await pool.query(
      `
        UPDATE employee AS e
        SET e.role_id = ?
        WHERE CONCAT(e.first_name, ' ', e.last_name) = ?
        `,
      [id, updateEmployee]
    );

    const [results] = await pool.query(
      `SELECT * FROM employee JOIN role ON employee.role_id = role.id;`
    );
    console.table(results);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  viewDeparts,
  viewRoles,
  viewEmpl,
  addDept,
  addRole,
  addEmpl,
  updateRole,
};
