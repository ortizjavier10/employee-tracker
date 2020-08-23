const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'Javixavi10!',
    database: 'employee_db'
  });

  connection.connect(err => {
      if (err) throw err;
        console.log(' WELCOME TO EMPLOYEE TRACKER!')

    startPrompts();
  });

// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function startPrompts() {
    const prompt = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role'
        ]
    });

    if(prompt.action === 'View all departments') {
        viewAllDepartments();
    }
    else if(prompt.action === 'View all roles') {
        viewAllRoles();
    }
    else if(prompt.action === 'View all employees') {
        viewAllEmployees();
    }
    else if(prompt.action === 'Add a department') {
        addADepartment();
    }
    else if(prompt.action === 'Add a role') {
        addARole();
    }
    else if(prompt.action === 'Add an employee') {
        addAnEmployee();
    }
    else if(prompt.action === 'Update an employee role') {
        updateAnEmployeeRole();
    }
};

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
viewAllDepartments = () => {
    const sql = `SELECT * FROM department`;
    const params = [];
    connection.query(sql, params, (err, rows) => {
        if (err) throw err;

        console.table(rows);

        startPrompts();
    });
};
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 