export class User {
  id = null;
  username = null;
  fullName = null;

  constructor(_id, _username, _fullName) {
    this.id = _id;
    this.username = _username;
    this.fullName = _fullName;
  }
}
