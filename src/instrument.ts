// Import with `const Sentry = require("@sentry/nestjs");` if you are using CJS
import * as Sentry from "@sentry/nestjs"

Sentry.init({
  dsn: "https://fa30b73b48df778b5fa487feab65cb62@o4510990922481664.ingest.de.sentry.io/4510990927200336",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});