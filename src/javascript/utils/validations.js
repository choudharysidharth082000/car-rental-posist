const validations = {};

validations.validateEmail = (email) => {
  console.log(email);
  const re = /\S+@\S+\.\S+/;
  console.log(re.test(email));
  return re.test(email);
};
//regex for password more than 8 characters long
validations.validatePassword = (password) => {
  console.log(password)
  //regex for getting the password of 8 chacarters long
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
};


//regeex for matching the password and the confirm passwpord
validations.matchPasswords = (password, confirmPassword) => {
  return password === confirmPassword;
};
