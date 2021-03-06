const {writeFile, copyFile} = require('./utils/generate-site');
/* const fs = require('fs'); */ // We no longer need this because we're writing FS in generate Site
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');

// *******************************************************************************************
// const creates a constant reference to the JavaScript element indicated when it is created.
// For strings and numbers, the content cannot be altered, because the reference is 
// to the content. For //// arrays and objects, however, the content can be altered, because
// the reference is to the container, not to the content.
// *******************************************************************************************

// collect command-line arguments and feed them to generatePage()
/* const profileDataArgs = process.argv.slice(2) */ /* , process.argv.length); */ // removes first two indexes
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

/* const mockData = {
        name: 'Lernantino',
        github: 'lernantino',
        confirmAbout: true,
        about:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
        projects: [
          {
            name: 'Run Buddy',
            description:
              'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
            languages: ['HTML', 'CSS'],
            link: 'https://github.com/lernantino/run-buddy',
            feature: true,
            confirmAddProject: true
          },
          {
            name: 'Taskinator',
            description:
              'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
            languages: ['JavaScript', 'HTML', 'CSS'],
            link: 'https://github.com/lernantino/taskinator',
            feature: true,
            confirmAddProject: true
          },
          {
            name: 'Taskmaster Pro',
            description:
              'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
            languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
            link: 'https://github.com/lernantino/taskmaster-pro',
            feature: false,
            confirmAddProject: true
          },
          {
            name: 'Robot Gladiators',
            description:
              'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
            languages: ['JavaScript'],
            link: 'https://github.com/lernantino/robot-gladiators',
            feature: false,
            confirmAddProject: false
          }
        ]
      }; */

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
            message: 'What is your name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('???');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your GitHub username?',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                }
                else {
                    console.log('???');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Do you want to add an "About" section?',
            default: false
        },
        {
            type: 'input',
            name: 'about',
            message: 'Tell us about yourself.',
            when: ({confirmAbout}) => {
                if (confirmAbout) {
                    return true;
                }
                else {
                    return false;
                }
            }
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
                message: 'What is the title of your project?',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    }
                    else {
                        console.log('???');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'description',
                message: 'Provide a description of your project. (Required)',
                validate: descriptionInput => {
                    if (descriptionInput) {
                        return true;
                    }
                    else {
                        console.log('???');
                        return false;
                    }
                }
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
                message: 'Please provide a link to your project. (Required)',
                validate: linkInput => {
                    if (linkInput) {
                        return true;
                    }
                    else {
                        console.log('???');
                        return false;
                    }
                }
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

/* const pageHTML = generatePage(mockData); */

/* promptUser()
    .then(promptProject)
    .then(portfolioData => {
        const pageHTML = generatePage(portfolioData);

        fs.writeFile('./dist/index.html', pageHTML, err => {
            if (err) throw new Error(err);
            console.log('Page created! Checkout index.html in this directory to see it!');
            
            fs.copyFile('./src/style.css', './dist/style.css', err => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('Stylesheet copied successfully!')
            });
        });
    }); */

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        return generatePage(portfolioData);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileReponse => {
        console.log(copyFileReponse);
    })
    .catch(err => {
        console.log(err);
    });

/* console.log(user, github);
console.log(generatePage(user, github)); */

//const pageHTML = generatePage(user, github);

//fs.writeFile('index.html', pageHTML, (err) => {
//    if (err) throw err;
//    console.log('Portfolio complete! Check out index.html to see the output!');
//});

// *************************************
/* 
So let's reiterate the flow this function will now have:

1. We start by asking the user for their information with
Inquirer prompts; this returns all of the data as an object in a Promise.

2. The promptProject() function captures the returning data
from promptUser() and we recursively call promptProject() for as many 
projects as the user wants to add. Each project will be pushed into a 
projects array in the collection of portfolio information, and when 
we're done, the final set of data is returned to the next .then().

3. The finished portfolio data object is returned as 
portfolioData and sent into the generatePage() function, 
which will return the finished HTML template code into pageHTML.

4. We pass pageHTML into the newly created writeFile() function,
which returns a Promise. This is why we use return here, so the 
Promise is returned into the next .then() method.

5. Upon a successful file creation, we take the writeFileResponse 
object provided by the writeFile() function's resolve() execution 
to log it, and then we return copyFile().

6. The Promise returned by copyFile() then lets us know if the CSS 
file was copied correctly, and if so, we're all done!
*/
//**************************************