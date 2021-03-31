const inquirer = require("inquirer");
const mysql = require('mysql')
require('console.table');
const util = require('util')

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Xe60gJ41Nf*E',
  database: 'workplace_db',
});
connection.query = util.promisify(connection.query)




const initial = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View', 'Add', 'Update', 'Delete'],
    })
    .then((answer) => {
      if (answer.action === 'View') {
        view();
      } else if (answer.action === 'Add') {
        add();
      } else if (answer.action === 'Update') {
        update();
      } else {
        remove();
      }
    });
};

//===================================================================================
const view = () => {
  inquirer
    .prompt({
      name: 'viewWhat',
      type: 'list',
      message: 'What would you like to view?',
      choices: ['Single employee', 'Single department', 'Single role', 'Everyone'],
    })
    .then((answer) => {
      if (answer.viewWhat === 'Single employee') {
        viewEmployee();
      } else if (answer.viewWhat === 'Single department') {
        viewDepartment();
      } else if (answer.viewWhat === 'Single role') {
        viewRole();
      } else {
        viewAll();
      }
    });
};


const viewEmployee = () => {
  inquirer
    .prompt({
      name: 'viewEmployee',
      type: 'input',
      message: 'What employee would you like to view? Search by ID',
    })
    .then((answer) => {
      viewEmp(answer.viewEmployee)
    });
};
employee = '';
function viewEmp(employee) {
  let query = "SELECT employee.firstName, employee.lastName, department.departmentName, role.title, role.salary FROM employee INNER JOIN department ON employee.department_id = department.id INNER JOIN role ON employee.role_id = role.id where employee.id = ?"
  connection.query(query, [employee], (err, res) => {
    if (err) throw err;
    console.table(res)
  })
}


const viewDepartment = () => {
  inquirer
    .prompt({
      name: 'viewDepartment',
      type: 'input',
      message: 'What department would you like to view? Search by department name',
    })
    .then((answer) => {
      viewDept(answer.viewDepartment)
    });
};

department= ''
function viewDept(department) {
  let query = "SELECT department.departmentName, employee.firstName, employee.lastName FROM employee INNER JOIN department ON employee.department_id = department.id WHERE department.departmentName = ?"
  connection.query(query, [department], (err, res) => {
    if (err) throw err;
    console.table(res)
  })
}

const viewRole = () => {
  inquirer
    .prompt({
      name: 'viewRole',
      type: 'input',
      message: 'What role would you like to view? Search by role title',
    })
    .then((answer) => {
      theRole(answer.viewRole)
    });
};
role = '';
function theRole(role) {
  let query = "SELECT role.title, employee.firstName, employee.lastName FROM employee INNER JOIN role ON employee.role_id = role.id where role.title = ?" 
  connection.query(query, [role], (err, res) => {
    if (err) throw err;
    console.table(res)
  })
}


async function viewAll() {
  let x = await connection.query('SELECT employee.firstName, employee.lastName, department.departmentName, role.title, role.salary FROM employee INNER JOIN department ON employee.department_id = department.id INNER JOIN role ON employee.role_id = role.id')
  console.table(x)
  // console.log(x)
}




//======================================================================
const add = () => {
  inquirer
    .prompt({
      name: 'addWhat',
      type: 'list',
      message: 'What would you like to add',
      choices: ['New employee', 'New role/title', 'New Department'],
    })
    .then((answer) => {
      if (answer.addWhat === 'New employee') {
        newEmployee();
      } else if (answer.addWhat === 'New role/title') {
        newRole();
      } else {
        newDepartment();
      }
    });
};

const newEmployee = () => {
  inquirer
    .prompt([{
      name: 'newEmployeeFirst',
      type: 'input',
      message: 'Their first name?',
    },
    {
      name: 'newEmployeeLast',
      type: 'input',
      message: 'Their last name?',
    },
    {
      name: 'newEmployeeRole',
      type: 'input',
      message: 'Their role id?',
    },
    {
      name: 'newEmployeeDepartment',
      type: 'input',
      message: 'Their department id?',
    }
    ])
    .then((answer) => {
      newE(answer.newEmployeeFirst, answer.newEmployeeLast, answer.newEmployeeRole, answer.newEmployeeDepartment)
    });
};
newE2 = '';
newE3 = '';
newE4 = '';
newE5 = '';
function newE(newE2, newE3,newE4,newE5) {
  let query = "INSERT INTO employee (firstName, lastName, role_id, department_id)VALUES (?, ?, ?, ?);" 
  connection.query(query, [newE2,newE3,newE4,newE5], (err, res) => {
    if (err) throw err;
    // console.table(res)
    console.log("Done")
  })
}

const newRole = () => {
  inquirer
    .prompt([{
      name: 'newRoleTitle',
      type: 'input',
      message: 'What is the title of the new role?',
    },
    {
      name: 'newRoleSalary',
      type: 'input',
      message: 'What is the salary of the new role?',
    }])
    .then((answer) => {
      newR(answer.newRoleTitle, answer.newRoleSalary)
    });
};
newR1 = '';
newE2 = '';
function newR(newR1, newR2) {
  let query = "INSERT INTO role (title, salary) VALUES (?, ?);" 
  connection.query(query, [newR1,newR2], (err, res) => {
    if (err) throw err;
    // console.table(res)
    console.log("Done")
  })
}

const newDepartment = () => {
  inquirer
    .prompt({
      name: 'newDepartmentName',
      type: 'input',
      message: 'What is the name of the new department?',
    })
    .then((answer) => {
      newD(answer.newDepartmentName)
    });
};
newD1 = '';
function newD(newD1) {
  let query = "INSERT INTO department (departmentName) VALUES (?);" 
  connection.query(query, [newD1], (err, res) => {
    if (err) throw err;
    // console.table(res)
    console.log("Done")
  })
}

//======================================================================
const update = () => {
  inquirer
    .prompt({
      name: 'updateWhat',
      type: 'list',
      message: 'What would you like to update?',
      choices: ["Employee role", 'Employee department', 'Employee name', 'Role Salary'],
    })
    .then((answer) => {
      if (answer.updateWhat === "Employee role") {
        updateRole();
      } else if (answer.updateWhat === 'Employee department') {
        updateDepartment();
      } else if (answer.updateWhat === 'Employee name') {
        updateName();
      } else {
        updateSalary();
      }
    });
};

const updateRole = () => {
  inquirer
  .prompt([{
    name: 'whichEmployee',
    type: 'input',
    message: "What is the employee's ID that you want to update?",
  },
  {
    name: 'updateRole',
    type: 'input',
    message: 'What is the new role of the employee?',
  }])
    .then((answer) => {
      newER(answer.whichEmployee, answer.updateRole)
    });
};
newER1 = '';
newER2 = '';
function newER(newER1, newER2) {
  let query = "UPDATE employee SET role_id = ? WHERE employee.id = ?" 
  connection.query(query, [newER2,newER1], (err, res) => {
    if (err) throw err;
    // console.table(res)
    console.log("Done")
  })
}

const updateDepartment = () => {
  inquirer
  .prompt([{
    name: 'whichEmployee',
    type: 'input',
    message: "What is the employee's ID that you want to update?",
  },
  {
    name: 'updateDepartment',
    type: 'input',
    message: 'What is new department of the employee',
  }])
    .then((answer) => {
      newED(answer.whichEmployee, answer.updateDepartment)
    });
};
newED1 = '';
newED2 = '';
function newED(newED1, newED2) {
  let query = "UPDATE employee SET department_id = ? WHERE employee.id = ?" 
  connection.query(query, [newED2,newED1], (err, res) => {
    if (err) throw err;
    // console.table(res)
    console.log("Done")
  })
}

const updateName = () => {
  inquirer
  .prompt([{
    name: 'whichEmployee',
    type: 'input',
    message: "What is the employee's ID that you want to update?",
  },
  {
    name: 'updateFirst',
    type: 'input',
    message: 'What is their new or current first name?',
  },
  {
    name: 'updatelast',
    type: 'input',
    message: 'What is their new or current last name?',
  }])
    .then((answer) => {
      newEN(answer.whichEmployee, answer.updateFirst, answer.updatelast)
    });
};
newEN1 = '';
newEN2 = '';
newEN3 = '';
function newEN(newEN1, newEN2, newEN3) {
  let query = "UPDATE employee SET employee.firstName = ?, employee.lastName = ? WHERE employee.id = ?"
  connection.query(query, [newEN2,newEN3,newEN1], (err, res) => {
    if (err) throw err;
    // console.table(res)
    console.log("Done")
  })
}

const updateSalary = () => {
  inquirer
    .prompt([{
      name: 'whichRole2',
      type: 'input',
      message: 'What is the title of the role you want to update?',
    },
    {
      name: 'updateSalary',
      type: 'input',
      message: 'What is the salary of the new role?',
    }])
    .then((answer) => {
      newRS(answer.whichRole2, answer.updateSalary)
    });
};
newRS1 = '';
newRS2 = '';
function newRS(newRS1, newRS2) {
  let query = "UPDATE role SET salary = ? WHERE role.title = ?" 
  connection.query(query, [newRS2,newRS1], (err, res) => {
    if (err) throw err;
    // console.table(res)
    console.log("Done")
  })
}


//======================================================================
const remove = () => {
  inquirer
    .prompt({
      name: 'deleteWhat',
      type: 'list',
      message: 'What would you like to Delete?',
      choices: ['Employee', 'Department', 'Role'],
    })
    .then((answer) => {
      if (answer.deleteWhat === 'Employee') {
        deleteEmployee();
      } else if (answer.deleteWhat === 'Department') {
        deleteDepartment();
      } else {
        deleteRole();
      }
    });
};

const deleteEmployee = () => {
  inquirer
    .prompt({
      name: 'deleteEmployee',
      type: 'input',
      message: 'What is the ID of the employee would you like to delete?',
    })
    .then((answer) => {
      deleteE(answer.deleteEmployee)
    });
};
deleteE1 = '';
function deleteE(deleteE1) {
  let query = "DELETE FROM employee WHERE employee.id = ?" 
  connection.query(query, [deleteE1], (err, res) => {
    if (err) throw err;
    // console.table(res)
    console.log("Done")
  })
}

const deleteDepartment = () => {
  inquirer
    .prompt({
      name: 'deleteDepartment',
      type: 'input',
      message: 'What is the name of the department would you like to delete?',
    })
    .then((answer) => {
      deleteD(answer.deleteEmployee)
    });
};
deleteD1 = '';
function deleteD(deleteD1) {
  let query = "DELETE FROM department WHERE department.departmentName = ?" 
  connection.query(query, [deleteD1], (err, res) => {
    if (err) throw err;
    // console.table(res)
    console.log("Done")
  })
}

const deleteRole = () => {
  inquirer
    .prompt({
      name: 'deleteRole',
      type: 'input',
      message: 'What is the title of the role would you like to delete?',
    })
    .then((answer) => {
      deleteR(answer.deleteEmployee)
    });
};
deleteR1 = '';
function deleteR(deleteR1) {
  let query = "DELETE FROM role WHERE role.title = ?" 
  connection.query(query, [deleteR1], (err, res) => {
    if (err) throw err;
    // console.table(res)
    console.log("Done")
  })
}







connection.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  initial();
});
