
export class UserProfile {
  constructor({
    id = "",
    username = "",
    email = "",
    first_name = "",
    last_name = "",
    about_me = "",
    birthdate = "",
    created_at = "",
  } = {}) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.about_me = about_me;
    this.birthdate = birthdate;
    this.created_at = created_at;
  }
}
