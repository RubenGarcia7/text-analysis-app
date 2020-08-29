/* Report Elements */
const scoreField = document.getElementById('score');
const confidenceField = document.getElementById('confidence');
const agreementField = document.getElementById('agreement');
const ironyField = document.getElementById('irony');


export function performAction(event) {
  event.preventDefault();

  const userText = textarea.value;

  Client.formValidator(userText);

  getTextData(userText);

}

// Fetch text data from API
export const getTextData = async (userText) => {

  try {
    const res = await fetch(`/analyse/${userText}`);
    const data = await res.json();
    console.log(data);
    updateUI(data, userText);

  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }
}

export function updateUI(data, userText) {

  let score = data.score_tag;
  let confidence = data.confidence;
  let agreement = data.agreement;
  let irony = data.irony;

  switch (score) {
    case 'P+':
      score = 'Very positive sentiment';
      break;
    case 'P':
      score = 'Positive sentiment';
      break;
    case 'NEU':
      score = 'Neutral sentiment';
      break;
    case 'N':
      score = 'Negative sentiment';
      break;
    case 'N+':
      score = 'Very negative sentiment';
      break;
    case 'NONE':
      score = 'This text has no sentiment';
      break;
  }

  switch (agreement) {
    case 'AGREEMENT':
      agreement = 'There is agreement between the elements polarity';
      break;
    case 'DISAGREEMENT':
      agreement = 'There is no agreement between the elements polarity';
      break;
  }

  switch (irony) {
    case 'IRONIC':
      irony = 'Ironic: The text has ironic marks';
      break;
    case 'NONIRONIC':
      irony = 'Non-ironic: The text does not have ironic marks';
      break;
  }

  // Update UI elements with the allData object
  scoreField.innerHTML = score;
  confidenceField.innerHTML = confidence;
  agreementField.innerHTML = agreement;
  ironyField.innerHTML = irony;
}
