// *******************************************************************************************
// const creates a constant reference to the JavaScript element indicated when it is created.
// For strings and numbers, the content cannot be altered, because the reference is 
// to the content. For //// arrays and objects, however, the content can be altered, because
// the reference is to the container, not to the content.
// *******************************************************************************************

const profileDataArgs = process.argv.slice(2, process.argv.length); // removes first two indexes
console.log(profileDataArgs);

const printProfileData = profileDataArr => {
     
    for (let i = 0; i < profileDataArr.length; i++) {
        console.log(profileDataArr[i]);
    }
    console.log('================');
    profileDataArr.forEach(profileItem => console.log(profileItem));
};

printProfileData(profileDataArgs);