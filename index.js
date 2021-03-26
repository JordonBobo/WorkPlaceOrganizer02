const inquirer = require("inquirer");
const mysql = require('mysql')
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Xe60gJ41Nf*E',
  database: 'workplace_db',
});





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

result = []
const viewEmployee = () => {
  inquirer
    .prompt({
      name: 'viewEmployee',
      type: 'input',
      message: 'What employee would you like to view?',
    })
    .then((answer) => {
      let x = connection.query('SELECT ? FROM employee', {id: answer.viewEmployee})
      console.log(x.first)
    });
};

const viewDepartment = () => {
  inquirer
    .prompt({
      name: 'viewDepartment',
      type: 'input',
      message: 'What department would you like to view?',
    })
    .then((answer) => {

    });
};

const viewRole = () => {
  inquirer
    .prompt({
      name: 'viewRole',
      type: 'input',
      message: 'What role would you like to view',
    })
    .then((answer) => {

    });
};

function viewAll() {
  let x = connection.query('SELECT * FROM employee')
  console.log(x)
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
      message: 'Their role?',
    },
    {
      name: 'newEmployeeManger',
      type: 'input',
      message: 'Their manager? leave blank if applicible',
    }
    ])
    .then((answer) => {

    });
};

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

    });
};

const newDepartment = () => {
  inquirer
    .prompt({
      name: 'newDepartmentName',
      type: 'input',
      message: 'What is the name of the new department?',
    })
    .then((answer) => {

    });
};

//======================================================================
const update = () => {
  inquirer
    .prompt({
      name: 'updateWhat',
      type: 'list',
      message: 'What would you like to update?',
      choices: ['Employee role', 'Employee department', 'Employee name', 'Employee manager', 'Role Salary'],
    })
    .then((answer) => {
      if (answer.action === 'Employee role') {
        updateRole();
      } else if (answer.updateWhat === 'Employee department') {
        updateDepartment();
      } else if (answer.updateWhat === 'Employee name') {
        updateName();
      } else if (answer.updateWhat === 'Employee manager') {
        updateManager();
      } else {
        updateSalary();
      }
    });
};

const updateRole = () => {
  inquirer
    .prompt({
      name: 'updateRole',
      type: 'input',
      message: 'What role would you like to update?',
    })
    .then((answer) => {

    });
};

const updateDepartment = () => {
  inquirer
    .prompt({
      name: 'updateDepartment',
      type: 'input',
      message: 'What department would you like to update?',
    })
    .then((answer) => {

    });
};

const updateName = () => {
  inquirer
    .prompt({
      name: 'updateName',
      type: 'input',
      message: 'What employee would you like to update?',
    })
    .then((answer) => {

    });
};

const updateManager = () => {
  inquirer
    .prompt({
      name: 'updateManager',
      type: 'input',
      message: "which employee's manager would you like to update?",
    })
    .then((answer) => {

    });
};

const updateSalary = () => {
  inquirer
    .prompt({
      name: 'viewEmployee',
      type: 'input',
      message: "What role's salary would you like to update?",
    })
    .then((answer) => {

    });
};


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
      message: 'What employee would you like to delete',
    })
    .then((answer) => {

    });
};

const deleteDepartment = () => {
  inquirer
    .prompt({
      name: 'deleteDepartment',
      type: 'input',
      message: 'What department would you like to delete?',
    })
    .then((answer) => {

    });
};

const deleteRole = () => {
  inquirer
    .prompt({
      name: 'deleteRole',
      type: 'input',
      message: 'What role would you like to delete?',
    })
    .then((answer) => {

    });
};







connection.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  initial();
});
