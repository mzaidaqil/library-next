import {Client as WorkFlowClient} from '@upstash/workflow';
import {Client as QstashClient, resend} from '@upstash/qstash';
import config from './config';


export const workFlowClient = new WorkFlowClient({
    baseUrl : config.env.upstash.qstashUrl,
    token : config.env.upstash.qstashToken,
});

export const qstashClient = new QstashClient({token : config.env.upstash.qstashToken,});

export const sendEmail = async ({email, subject, message} : {email: string, subject: string, message: string}) => {
    await qstashClient.publishJSON({
        api : {
            name : "email",
            provider : resend({token : config.env.upstash.resendToken}),
        },
        body : {
            from : "Zayed <contact@zaidaqil.com>",
            email : [email],
            subject, 
            html : message,
        }
    })
}



