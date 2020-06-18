export class Message {
  id = null;
  sender = null;
  receiver = null;
  body = null;
  subject = null;
  creation_date = null;

  constructor(_id, _sender, _receiver, _body, _subject, _creation_date) {
    this.id = _id;
    this.sender = _sender;
    this.receiver = _receiver;
    this.body = _body;
    this.subject = _subject;
    this.creation_date = _creation_date;
  }
}
