function setTokenLocalStorage(token) {
  localStorage.setItem('token', token);
}

function getTokenFromLocalStorage() {
  return localStorage.getItem('token');
}

function removeTokenFromLocalStorage() {
  localStorage.removeItem('token');
}

// ----- Step 1 : Listen for the DOMContetntLoaded event to ensure the entire DOM is Loaded
document.addEventListener('DOMContentLoaded', () => {
  // Target the form element with the ID "sign_up"

  const registerUserForm = document.getElementById('sign_up');
  // Add an event listener to the form the handle the 'submit' event using the 'handleRegisterUser' function
  registerUserForm.addEventListener('submit', handleRegisterUser);
});

// ----- Step 2 : Define the async handler function that accepts the 'submit' event
const handleRegisterUser = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Create a FormData object from the form
  const formData = new FormData(event.target);
  // Extract the name, email, and password from the FormData object
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');

  console.log({ name, email, password });

  // Call the 'registerUser' function with the extracted name, email, and password
  await registerUser({ name, email, password });
};

// ----- Step 3 : Define the assync function that sends the name, email, and password to the backend
const registerUser = async ({ name, email, password }) => {
  console.log({ name, email, password });

  try {
    const response = await fetch('http://localhost:7000/api/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    // Parse the JSON response from the server
    const data = await response.json();

    alert(`${data.message}`);
  } catch (error) {
    // Log the error in the console
    console.error(error.response);
  }
};

// ************ For the Sign-in ! step 1,2,3

// ----- Step 1 : Listen for the DOMContetntLoaded event to ensure the entire DOM is Loaded
document.addEventListener('DOMContentLoaded', () => {
  // Target the form element with the ID "sign_in"
  const signInForm = document.getElementById('sign_in');
  // Add an event listener to the form to handle the 'submit' event using the 'handleSignIn' function
  signInForm.addEventListener('submit', handleSignIn);
});

// ------------ Step 2: Define the async handler function that accepts the 'submit' event
const handleSignIn = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Create a FormData object from the form
  const formData = new FormData(event.target);
  // Extract the email and password from the FormData object
  const email = formData.get('email');
  const password = formData.get('password');

  // Call the 'signInUser' function with the extracted email and password
  await signInUser({ email, password });
};

// ------------ Step 3: Define the async function that sends the email and password to the backend
const signInUser = async ({ email, password }) => {
  try {
    // Make a POST request to the backend with the email and password
    const response = await fetch('http://localhost:7000/api/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Parse the JSON response from the server
    const data = await response.json();

    console.log(data);

    // Save the token in local storage
    setTokenLocalStorage(data.token);

    // alert the user that they are signed in
    alert('Sign In Successful!');
  } catch (error) {
    // Log the error in the console
    console.error(error);

    // alert the user there was a problem signing in
    alert('Sign In ERROR! Please try again.');
  }
};
