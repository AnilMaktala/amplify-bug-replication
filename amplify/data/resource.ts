import {
  type ClientSchema,
  a,
  defineData,
  defineFunction,
} from "@aws-amplify/backend";

const echoHandler = defineFunction({ entry: "./echo-handler/handler.ts" });

const schema = a.schema({
  EchoResponse: a.customType({
    content: a.string(),
    executionDuration: a.float(),
  }),

  echo: a
    .query()
    .arguments({ content: a.string(), status: a.boolean() })
    .returns(a.ref("EchoResponse"))
    .authorization((allow) => [allow.authenticated()])
    .handler(a.handler.function(echoHandler)),
  Measures: a.customType({
    ts: a.integer(),
    on: a.boolean(),
    standby: a.boolean(),
    tankPct: a.float(),
    tankRem: a.float(),
    bmsPct: a.float(),
    bmsRem: a.float(),
    flow: a.float(),
    outPsi: a.float(),
    outKpa: a.float(),
  }),
  Todo: a
    .model({
      content: a.string(),
      status: a.boolean(),
    })
    .authorization((allow) => [allow.guest()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
  },
});
