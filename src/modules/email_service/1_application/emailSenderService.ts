import EmailSenderUseCase from "../0_core/emailSenderUseCase";
import EmailSenderGateway from "../2_adapters/emailSenderGateway";

class EmailSenderService implements EmailSenderUseCase {
  constructor(private readonly emailSenderGateway: EmailSenderGateway) {}

  sendEmail(to: string, subject: string, body: string): void {
    this.emailSenderGateway.sendEmail(to, subject, body);
    console.log(`Email sent to ${to} with subject ${subject} and body ${body}`);
    return;
  }
}
