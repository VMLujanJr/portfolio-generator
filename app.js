//const fs = require('fs');
const inquirer = require('inquirer');

//const generatePage = require('./src/page-template');
// *******************************************************************************************
// const creates a constant reference to the JavaScript element indicated when it is created.
// For strings and numbers, the content cannot be altered, because the reference is 
// to the content. For //// arrays and objects, however, the content can be altered, because
// the reference is to the container, not to the content.
// *******************************************************************************************

// collect command-line arguments and feed them to generatePage()
/* const profileDataArgs = process.argv.slice(2) */ /* , process.argv.length) */; // removes first two indexes
/* console.log(profileDataArgs); */

// extract profileDataArgs and store them into distinct variables
// this...
/* const user = profileDataArgs[0];
const github = profileDataArgs[1]; */

// ...same as this
/* const [user, github] = profileDataArgs; */

/* console.log(name);
console.log(github); */

// ONLY REFERENCE!!! Arrow functions
/* const printProfileData = profileDataArr => {
    // This...
    for (let i = 0; i < profileDataArr.length; i++) {
        console.log(profileDataArr[i]);
    }
    console.log('================');
    // ...is the same as this.
    profileDataArr.forEach(profileItem => console.log(profileItem));
};

printProfileData(profileDataArgs); */

// create function that can receive input and display data dynamically
/* const generatePage = (userName, githubName) => {
    return`
    <!DOCTYPE html>
    <html lang="en-US">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Generate Portfolio</title>
    </head>

    <body>
        <h1>${user}</h1>
        <h2><a href="https://github.com/${github}">GitHub</a></h2>
    </body>
    </html>
    `;
} */

const promptUser = () => {
console.log(`
=================
Profile Questions
=================
`)

    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your GitHub username?'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Tell us about yourself.'
        }
    ]);
};

const promptProject = portfolioData => {
console.log(`
=================
Add a New Project
=================
`)
    // if there's no 'projects' array property, create one
    if (!portfolioData.projects) { // occurs on the first pass only, otherwise it will erase
        portfolioData.projects = [];
    }

    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the title of your project?'
            },
            {
                type: 'input',
                name: 'description',
                message: 'Provide a description of your project. (Required)'
            },
            {
                type: 'checkbox',
                name: 'languages',
                message: 'What programming languages are being used for this project? (Check all that apply)',
                choices: ['HTML', 'CSS', 'JavaScript', 'ES6', 'jQuery', 'Bootstrap', 'Node.js']
            },
            {
                type: 'input',
                name: 'link',
                message: 'Please provide a link to your project. (Required)'
            },
            {
                type: 'confirm',
                name: 'feature',
                message: 'Would you like to feature this project?',
                default: false
            },
            {
                type: 'confirm',
                name: 'confirmAddProject',
                message: 'Would you like to enter another project?',
                default: false
            }
        ])
        .then(projectData => {
            portfolioData.projects.push(projectData);

            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            }
            else {
                return portfolioData;
            }
        });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });

/* console.log(user, github);
console.log(generatePage(user, github)); */

//const pageHTML = generatePage(user, github);

//fs.writeFile('index.html', pageHTML, (err) => {
//    if (err) throw err;
//    console.log('Portfolio complete! Check out index.html to see the output!');
//});

