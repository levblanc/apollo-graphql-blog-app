export default function emailValidator(email: string): null | string {
  if (!email) {
    return 'Email is required';
  }

  const isValidFormat = /^\S+@\S+$/.test(email);

  if (isValidFormat) {
    return null;
  } else {
    return 'Invalid email format';
  }
}
