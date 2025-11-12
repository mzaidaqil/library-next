 'use server';

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";
import { redirect } from "next/navigation";
import config from "@/lib/config";
import { Client as WorkflowClient } from "@upstash/workflow";

const workflowClient = new WorkflowClient({
    baseUrl : config.env.upstash.qstashUrl,
});

export const signUp = async (params: AuthCredentials) => {
    const { fullName, email, universityId, universityCard, password } = params;

    const ip = ((await headers()).get('x-forwarded-for') || '127.0.0.1');
    const {success} = await ratelimit.limit(ip);

    if (!success){
        return redirect('/too-fast');
    }

    // Check if existing user exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (existingUser.length > 0) {
        throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    try {
        await db.insert(users).values({
            fullName,
            email,
            universityId,
            universityCard,
            password: hashedPassword,
        });

        await workflowClient.trigger({
            url : `${config.env.prodApiEndpoint}/api/auth/workflow/onboarding`, 
            body : {
                email, 
                fullName,
            }
        })

        await signInWithCredentials({ email, password });
        return { success: true, message: 'User created successfully' };
    } catch (error) {
        console.log(error, 'Error sign up');
        return { success: false, error: 'Something went wrong' };
    }
};

export const signInWithCredentials = async (params: Pick<AuthCredentials, 'email' | 'password'>) => {
    const { email, password } = params;

    const ip = ((await headers()).get('x-forwarded-for') || '127.0.0.1');
    const {success} = await ratelimit.limit(ip);

    if (!success){
        return redirect('/too-fast');
    }


    try {
        const result = await signIn('credentials', { email, password, redirect: false });
        if (result?.error) {
            return { success: false, error: result.error };
        }
        return { success: true, message: 'User signed in successfully' };
    } catch (error) {
        console.log(error, 'Error sign in with credentials');
        return { success: false, error: 'Something went wrong' };
    }
};