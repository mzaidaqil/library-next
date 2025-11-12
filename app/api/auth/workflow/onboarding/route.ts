import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { serve } from "@upstash/workflow/nextjs";  // Fixed import
import { eq } from "drizzle-orm";
import { sendEmail } from "@/lib/workflow";

type UserState = "non-active" | "active";  // Fixed name (removed 's')

type InitialData = {
  email: string;
  fullName: string;
};

const ONE_DAY_IN_MS = 60 * 60 * 24 * 1000;
const THREE_DAYS_IN_MS = 60 * 60 * 24 * 1000 * 3;
const THIRTY_DAYS_IN_MS = 60 * 60 * 24 * 1000 * 30;

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (user.length === 0) return "non-active";

  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();

  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (timeDifference > THREE_DAYS_IN_MS && timeDifference <= THIRTY_DAYS_IN_MS) return "non-active";

  return "active";
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  // Welcome Email
  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: 'Welcome to the platform',
      message: `Welcome ${fullName}`
    });
  });  // Fixed: Added closing brace

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({  // Fixed: Proper function call syntax
          email,
          subject: "Are you still there?",
          message: `Hey ${fullName}! we miss you! We're here to help you get started with your library journey. Let us know if you need anything.`
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({  // Fixed: Proper function call syntax
          email,
          subject: "Welcome Back!",  // Fixed: Added comma
          message: `Hey ${fullName}! We're glad to have you back. Let us know if you need anything.`
        });
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});