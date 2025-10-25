export function createRegisterBody(formData) {
    const isoDate = formData.birthdate
  ? new Date(formData.birthdate).toISOString()
  : null;
  return {
    username: formData.username,
    email: formData.email,
    password: formData.password,
    verify: formData.verify,
    profile: {
      birthdate: isoDate,
      first_name: formData.first_name,
      last_name: formData.last_name,
      about_me: formData.about_me,
    },
  };
}

export function createLoginBody(formData) {
  return {
    email: formData.email,
    password: formData.password,
  };
}
