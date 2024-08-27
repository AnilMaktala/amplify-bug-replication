import { type ClientSchema, a, defineData, defineFunction } from "@aws-amplify/backend";

const echoHandler = defineFunction({ entry: './echo-handler/handler.ts' });

const schema = a.schema({
  EchoResponse: a.customType({
    content: a.string(),
    executionDuration: a.float(),
  }),

  echo: a
    .query()
    .arguments({ content: a.string() })
    .returns(a.ref("EchoResponse"))
    .authorization(allow => [allow.authenticated()])
    .handler(a.handler.function(echoHandler)),

  Todo: a
    .model({ content: a.string(), })
    .authorization((allow) => [allow.guest()]),
})

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});