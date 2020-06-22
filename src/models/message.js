export class Message {
  id = null;
  sender = null;
  receiver = null;
  body = null;
  subject = null;
  creationDate = null;

  constructor(_id, _sender, _receiver, _body, _subject, _creationDate) {
    this.id = _id;
    this.sender = _sender;
    this.receiver = _receiver;
    this.body = _body;
    this.subject = _subject;
    this.creationDate = _creationDate;
  }
}
