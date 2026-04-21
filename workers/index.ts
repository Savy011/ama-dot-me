import { eq } from "drizzle-orm";
import PostalMime from "postal-mime";
import { Resend } from "resend";

import { getDb } from "../src/lib/db";
import { Question } from "../src/lib/db/schema";

export default {
  async email(message, env): Promise<void> {
    const sender = message.from;
    const subject = message.headers.get("subject");

    if (sender !== env.OWNER_EMAIL) {
      console.error(`rejected email from unknown sender: ${sender}`);
      return;
    }

    if (!subject) {
      await message.forward(env.OWNER_EMAIL);
      console.error("subject not found for the email.");
      return;
    }

    const rawEmail = await new Response(message.raw).arrayBuffer();
    const parsed = await new PostalMime().parse(rawEmail);

    const emailBody = parsed.text;

    if (!emailBody) {
      console.error("email does not contain a body.");
      return;
    }

    console.log("=== Inbound Email Received ===");
    console.log(`From: ${sender}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${emailBody}`);
    console.log("==============================");

    const IdFromSubjectRegex = /Re: \[ask-(.*?)\]/;
    const match = IdFromSubjectRegex.exec(subject);

    if (!match) return;

    const questionId = match[1];

    const AnswerFromEmailBodyRegex = /\r?\nOn .+wrote:/s;
    const answer = emailBody
      .split(AnswerFromEmailBodyRegex)[0]
      .split(/\n--\n/)[0]
      .trim();
    if (!answer) return;

    const db = getDb(env.D1);

    try {
      await db
        .update(Question)
        .set({
          answer,
          answeredAt: new Date(),
          published: true,
        })
        .where(eq(Question.id, questionId));
    } catch {
      const resend = new Resend(env.RESEND_API_KEY);

      await resend.emails.send({
        from: `Email Router <${env.REPLY_EMAIL}>`,
        to: [env.OWNER_EMAIL],
        subject: `[ama] failed to publish answer for ask-${questionId}`,
        text: `Failed to update question ${questionId} with the following answer:\n\n${answer}\n\nCheck your D1 database manually.`,
      });
    }
  },
} satisfies ExportedHandler<Env>;
