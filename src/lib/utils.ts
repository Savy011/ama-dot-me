import { env } from "cloudflare:workers";

type ValidationResponse = {
  action: string;
  cdata: string;
  challenge_ts: string;
  "error-codes": Array<unknown>;
  hostname: string;
  metadata: { interactive: boolean };
  success: boolean;
};

export async function validateToken(token: string) {
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      response: token,
      secret: env.TURNSTILE_SECRET,
    }),
  });

  return ((await response.json()) as ValidationResponse).success;
}
