/**
 * Interface for an email sender use case.
 * Sends an email with the specified recipient, subject, and body.
 * @param to The email address of the recipient.
 * @param subject The subject of the email.
 * @param body The body content of the email.
 */
export default interface EmailSenderUseCase {
  sendEmail(to: string, subject: string, body: string): void;
}
