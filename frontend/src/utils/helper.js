export const validateEmail = (email) =>  {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long.`;
  }

  if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
    return 'The password must contain at least one uppercase letter, one lowercase letter, one number, and at least one special character.'
  }

  return "";
}
