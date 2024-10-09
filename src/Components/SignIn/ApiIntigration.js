import { createClient } from "smtpexpress"

export const smtpexpressClient = createClient({
  projectId: "<INSERT_PROJECT_ID>",
  projectSecret: "<INSERT_PROJECT_SECRET>"
});