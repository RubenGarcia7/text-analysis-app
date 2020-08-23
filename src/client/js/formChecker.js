export function formValidator(userText) {
  // Form validation
  if (userText === '' || userText === null) {
    alert('Please type something');
  } else if (userText.length > 5000) {
    alert('The maximum number of characters is 5000');
  } else {
    return true;
  }
}

// function checkForName(inputText) {
//     console.log("::: Running checkForName :::", inputText);
//     let names = [
//         "Picard",
//         "Janeway",
//         "Kirk",
//         "Archer",
//         "Georgiou"
//     ]

//     if(names.includes(inputText)) {
//         alert("Welcome, Captain!")
//     }
// }

// export { checkForName }
