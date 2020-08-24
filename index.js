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

    // startPrompts();
  });

// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
async function startPrompts() {
    const prompt = await inquirer.prompt([
        {
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
        }   
    ]);

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

viewAllRoles = () => {
    const sql = `SELECT * FROM role`;
    const params = [];
    connection.query(sql, params, (err, rows) => {
        if (err) throw err;

        console.table(rows);

        startPrompts();
    });
};
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
viewAllEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary 
                FROM employee LEFT JOIN role ON employee.role_id = role.id 
                LEFT JOIN department ON role.department_id = department.id `;
    const params = [];
    connection.query(sql, params, (err, rows) => {
        if (err) throw err;

        console.table(rows);

        startPrompts();

    });
};
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

function addADepartment() {
    inquirer.prompt(
        {
            type: 'input',
            name: 'departmentname',
            message: 'What is the name of the department?',
            validate: answer => {
                if (answer) {
                    return true;
                } else {
                    console.log('Please enter a department name!');
                    return false;
                }
            }
        }
    )
    .then(answer => {
        connection.query(`INSERT INTO department SET ?`, {
            name: answer.departmentName
        });
        
        console.log('Department added');

        startPrompts();
    });
};
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addARole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'rolename',
            message: 'What is the name of the role?',
            validate: answer => {
                if (answer) {
                    return true;
                } else {
                    console.log('Please enter a valid role!');
                    return false;
                }
            }
        },
        {
            type: 'input', 
            name: 'salaryamount',
            message: 'Please enter a salary amount.',
            validate: answer => {
                if (answer) {
                    return true;
                } else {
                    console.log('Please enter a valid amount');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'departmentname',
            message: 'What department would you like to add this role to?',
            choices: function() {
                var depArray = [];

                res.forEach(department => {
                    depArray.push(department.name)
                });
                return depArray;
            }
        }
    ])
    .then(answer => {
            connection.query(`INSERT INTO role SET ?`, {
                title: answer.rolename,
                salary: answer.salaryamount,
                department_id: answer.departmentName
            }),
            console.log('Role added')
    })
        // .then(() => viewAllRoles());
        
        

        startPrompts();
    
};
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
function addAnEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstname',
            message: "What is the employee's first name?",
            validate: answer => {
                if (answer) {
                    return true;
                } else {
                    console.log("Please enter the employee's first name.");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastname',
            message: "What is the employee's last name?",
            validate: answer => {
                if (answer) {
                    return true;
                } else {
                    console.log("Please enter the employee's last name.");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'rolename',
            message: "What is the employee's role ID?",
            validate: answer => {
                if (answer) {
                    return true;
                } else {
                    console.log("Please enter a role ID for the employee.");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'managerid',
            message: "What is the manager's ID?",
            validate: answer => {
                if (answer) {
                    return true;
                } else {
                    console.log("Pkease eneter the manager's ID.");
                    return false;
                }
            }

        }
            

    ])
    .then(answer => {
        connection.query(`INSERT INTO employee SET ?`, {
            first_name: answer.first.name,
            last_name: answer.lastname,
            role_id: answer.rolename,
            manager_id: answer.managerid
        });
        console.log('New employee added');

        startPrompts();
    });
};
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
// const updateAnEmployeeRole = () => {
//     connection.query(`SELECT employee.first_name, employee.last_name FROM employee`,
//     function(err, res) {
//         if (err) throw err;
        
//         inquirer.prompt({
//             type: 'list',
//             name: 'employeename',
//             message: "Which employee do you want to update?",
//             choices: function() {
//                 employeeArray = [];
//                 res.forEach(employee => {
//                     var firstName = employee.first_name;
//                     var lastName = employee.last_name;
//                 )}
//             }
//         })
//     })
// }
// function updateAnEmployeeRole(data)

startPrompts();