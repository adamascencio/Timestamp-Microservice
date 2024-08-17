// cached elements
const form = document.querySelector('form');
const textInput = document.getElementById('date-input')
const result = document.getElementById('result');

// event listeners
form.addEventListener('submit', evt => {
  evt.preventDefault()
  const date = replaceForwardSlashes(textInput.value);
  if (new Date(date) == 'Invalid Date') {
    result.innerText = 'Invalid Date';
    return;
  }
  fetch(`/api/${date}`)
    .then(res => res.json())
    .then(data => {
      const { utc, unix } = data;
      result.innerText = `UTC: ${utc} \nUNIX: ${unix}`;
    })
})

//helper functions
const replaceForwardSlashes = str => {
  return str.replace(/\//g, '-');
}
