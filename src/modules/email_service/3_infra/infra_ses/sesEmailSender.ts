import EmailSenderGateway from "../../2_adapters/emailSenderGateway";
import * as AWS from "aws-sdk/";
import {config} from "../../../../plugins/config";
import EmailServiceError from "../../0_core/errors/emailServiceError";

export default class SesEmailSender implements EmailSenderGateway {
  /**
   *
   */
  constructor() {
    const configVars = config;
    AWS.config.update({
      region: configVars.AWS_REGION,
    });
  }
  /**
   *
   * @param to
   * @param subject
   * @param body
   */
  sendEmail(to: string, subject: string, body: string): void {
    const source = config.AWS_SES_SENDER;
    if (!source) {
      throw new Error("AWS SES sender not set");
    }

    const params: AWS.SES.SendEmailRequest = {
      Source: source,
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
    const sendPromise = new AWS.SES({apiVersion: "2010-12-01"})
      .sendEmail(params)
      .promise();
    sendPromise.then().catch((data) => {
      console.log("Error sending email via SES");
      console.log(data.MessageId);
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Body: ${body}`);
      throw new EmailServiceError(`Error sending email via SES: ${data})`);
    });
    console.log("Sending email via SES");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);
  }
}
