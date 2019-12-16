const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const employee= require('./library/employee');
const engineer= require('./library/engineer');
const intern=require('./library/intern');
const manager=require('./library/manager');
const ejs = require('ejs');

const employeeArray=[];

function prompt(){
    return inquirer
    .prompt([
        {
            type: "input",
            message: "Enter your name?",
            name: "name"
        },
        {
            type: "input",
            message: "Enter your ID?",
            name: "id"
        },
        {
            type: "input",
            message: "Enter your email address?",
            name: "email"
        },
        {
            type: "list",
            message: "Enter your role in the company?",
            name: "role",
            choices: [
                "manager",
                "engineer",
                "intern"
            ]
        }
    ])
}


async function getEmployee(){
   
        let addMore = true;
        while (addMore) {
const answers= await prompt();
const {name,id,email,role}= answers;

switch(role){
    case 'manager':
        const officeNumb= await inquirer.prompt(
            {
                type:'input',
                message:'Enter your office number',
                name:'office'
            })

            const {office} =officeNumb;
            const Manager= new manager(name,id,email,office);
            employeeArray.push(Manager);
            break;

            case 'engineer':
                const githubUser= await inquirer.prompt(
                    {
                        type:'input',
                        message:'Enter your Github Username',
                        name:'github'
                    })
        
                    const {github} =githubUser;
                    const Engineer= new engineer(name,id,email,github);
                    employeeArray.push(Engineer);
                    break;

                    case 'intern':
                        const schoolUser= await inquirer.prompt(
                            {
                                type:'input',
                                message:'Enter your school name',
                                name:'school'
                            })
                
                            const {school} =schoolUser;
                            const Intern= new intern(name,id,email,school);
                            employeeArray.push(Intern);
                            break;
}

const addEmployee = await inquirer.prompt({
    type: "list",
    message: "ADD MORE EMPLOYEES?",
    name: "add",
    choices: [
        "yes",
        "no"
    ]
})

if (addEmployee.add === "no") {
    addMore = false;
}
}
const teamHTML = await ejs.renderFile("./html/employee.html", { employeeArray });
await writeFileAsync("./team.html", teamHTML, 'utf-8');
console.log(employeeArray);

}
  

getEmployee();