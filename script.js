const form = document.getElementById('form'); 
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = ' form-control error';
  //*--- first wrote message in one line -----
  // formControl.lastElementChild.textContent = message;
  const small = formControl.querySelector('small');
  small.textContent = message;
  //**- Brads version uses innertext *--
  // small.innerText = message;
}
//show input success outline highlight
function showSuccess(input) {
  const formControl2 = input.parentElement;
  formControl2.className = 'form-control success';
}
//check if email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(String(email).toLowerCase());
  if(re.test(input.value.trim())) {
    
    showSuccess(input)
  } else {
    showError(input, 'Email is not valid');
  }
    
}



// check required fields
function checkRequried(inputArr) {
  inputArr.forEach(function(input){
    if (input.value.trim()  === ''){
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}
// Check input length
function checklength(input, min, max) {
  if(input.value.length < min){
    showError(input, `${getFieldName(input)} needs to be at least ${min} characters`)
    
  } else if( input.value.length > max) {
    showError(input, `${getFieldName(input)} needs to be less than ${max} characters`)
    
  } else {
    showSuccess(input);
  }

}

//Check if passwords match
function checkPassMatch(input1, input2) {
  if(input1.value !== input2.value) {
    showError(input2, '* Passwords must match!')
  }
}

//Get fieldname
function getFieldName(input){
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners --------
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequried([username, email, password, password2]);
  checklength(username, 3, 15);
  checklength(password, 6, 25);
  checkEmail(email);
  checkPassMatch(password, password2);

//- ******** older un-refactored code - ****
  // if(username.value === '') {
  //   showError(username, 'Username is required');
  // } else {
  //   showSuccess(username);
  // }

  // if(email.value === '') {
  //   showError(email, 'Email is required');
  // } else if(!isValid(email.value)){
  //   showError(email, 'Email is not valid');
  // } else {
  //   showSuccess(email);
  // }

  // if(password.value === '') {
  //   showError(password, 'Password is required');
  // } else {
  //   showSuccess(password);
  // }

  // if(password2.value === '') {
  //   showError(password2, 'Password2 is required');
  // } else {
  //   showSuccess(password2);
  // }
});