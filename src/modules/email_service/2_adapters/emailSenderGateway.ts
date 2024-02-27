export default interface EmailSenderGateway {
  sendEmail(to: string, subject: string, body: string): void;
}
