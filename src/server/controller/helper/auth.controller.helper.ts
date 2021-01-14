import * as mailerData from '../../settings/mailer.settings.json';
import { emailer, IEmailer, IEmailerContent } from '../../lib/emailer';


/**
 * Send Request CV email with token
 */
 export const sendRequestCvEmail = (
    email: string,
    firstName:string,
    lastName: string,
    baseUrl: string,
    token: string,
    content?: string
):Promise<IEmailer> => {
    const { from, subject, templateName, text } = mailerData.requestCv.verification;
    // construct the plain text view with link
    const plainText = `Hello ${firstName} ${lastName}, \n\n ${text} \n\n ${baseUrl}/about/cv/${token}`
    return emailer({
        to: email,
        from,
        subject,
        templateName,
        text: plainText,
        data: {
            firstName,
            lastName,
            baseUrl,
            token,
            content
        }
    });
}