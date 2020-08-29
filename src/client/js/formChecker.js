export function formValidator(userText) {
  // Make sure the input is not blank and the number of characters is below 5000

  if (userText === '' || userText === null) {
    alert('Field is empty, please type something');
  } else if (userText.length > 5000) {
    alert('The maximum number of characters is 5000');
  } else {
    return true;
  }
}