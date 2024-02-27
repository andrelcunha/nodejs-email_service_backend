import EmailSenderGateway from "../../2_adapters/emailSenderGateway";
import * as AWS from "aws-sdk";
import {config} from "../../../../plugins/config";
import EmailServiceError from "../../0_core/errors/emailServiceError";

export default class SesEmailSender implements EmailSenderGateway {
  source: string;
  ses: AWS.SES;

  constructor() {
    this.ses = new AWS.SES({
      region: config.AWS_REGION,
      accessKeyId: config.AWS_ACCESS_KEY,
      secretAccessKey: config.AWS_SECRET_KEY,
    });
    this.source = config.AWS_SES_SENDER || "";
  }
  /**
   *
   * @param to
   * @param subject
   * @param body
   */
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const params: AWS.SES.SendEmailRequest = this.requestBuilder(
      to,
      subject,
      body
    );
    try {
      const data = await this.ses.sendEmail(params).promise();
    } catch (err) {
      console.log(err);
      throw new EmailServiceError(`Error sending email via SES: ${err})`);
    }
  }

  private requestBuilder(
    to: string,
    subject: string,
    body: string
  ): AWS.SES.SendEmailRequest {
    return {
      Source: this.source,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Html: {
            Data: "",
          },
          Text: {
            Data: body,
          },
        },
      },
    };
  }
}
