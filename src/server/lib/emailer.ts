import * as mailgun from 'mailgun-js';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_SUBDOMAIN = process.env.MAILGUN_SUBDOMAIN;
const MAILGUN_HOST = process.env.MAILGUN_HOST;
// initialise mailgun
const mg = mailgun({
    apiKey: MAILGUN_API_KEY, 
    domain: MAILGUN_SUBDOMAIN,
    host: MAILGUN_HOST
});

// interface for response
export interface IEmailer {
    to: string;
    from: string;
    subject: string;
}

// interface for content of email
export interface IEmailerContent<T=any> {
    text?: string,
    templateName: string,
    data: T,
    attachment?: string
};

/**
 * 
 * @param props Emailer using SendGrid
 */
export const emailer = async (props:(IEmailer & IEmailerContent)):Promise<IEmailer> => {
    try  {
        const { templateName, data, ...mailProps } = props;
        // build from file
        const source = await fs.readFileSync(path.join(__dirname, '..', '..', '..', 'templates', `${templateName}.hbs`), 'utf8');
        const template = handlebars.compile(source);
        const html = template(data);
        // send mail and wait for response
        await mg.messages().send({...mailProps, html});
        return Promise.resolve(props);
    } catch(e) {
        return Promise.reject(e);
    }
}