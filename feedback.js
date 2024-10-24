const feedbackForm = document.getElementById('feedback-form');

feedbackForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(feedbackForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const feedback = formData.get('feedback');
  const rating = formData.get('rating');

  // Send the feedback data to your server-side script or Google Sheet
  sendDataToGoogleSheet(name, email, feedback, rating);

  feedbackForm.reset(); // Clear the form fields
});

function sendDataToGoogleSheet(name, email, feedback, rating) {
  const url = 'https://docs.google.com/spreadsheets/d/1YYFdlncaNpplypIeTAreYYMk7_SQ2x8OGPiSFX53cs0/edit?usp=sharing'; // Replace with your actual URL

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, feedback, rating })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Feedback sent successfully:', data);
    // Show a success message to the user
    alert('Feedback submitted successfully!');
  })
  .catch(error => {
    console.error('Error sending feedback:', error);
    // Show an error message to the user
    alert('Error sending feedback. Please try again later.');
  });
}
