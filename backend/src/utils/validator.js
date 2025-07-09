export const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
export const isValidPhone = (phone) => /^\d{10}$/.test(phone);
