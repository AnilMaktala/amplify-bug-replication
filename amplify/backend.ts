import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { aws_appsync as appsync } from "aws-cdk-lib";
import { Stack } from "aws-cdk-lib";

const backend = defineBackend({
  auth,
  data,
});

// Access the AppSync resolver for the "listTodo1s" query from the CloudFormation resources
const listTodoResolver =
  backend.data.resources.cfnResources.cfnResolvers["Query.listTodo1s"];

console.log(
  Object.keys(
    backend.data.resources.cfnResources.cfnResolvers["Query.listTodo1s"]
  )
);
listTodoResolver.addPropertyOverride(
  "RequestMappingTemplate",
  `{
        $util.qr($ctx.stash.put("typeName", "Query"))
        $util.qr($ctx.stash.put("fieldName", "listTodo1s"))
        $util.qr($ctx.stash.put("conditions", []))
        $util.qr($ctx.stash.put("metadata", {}))
        $util.qr($ctx.stash.metadata.put("dataSourceType", "AMAZON_DYNAMODB"))
        $util.qr($ctx.stash.metadata.put("apiId", "xxxxx"))
        $util.qr($ctx.stash.put("connectionAttributes", {}))
        $util.qr($ctx.stash.put("tableName", "Todo1-xxxx-NONE"))
        $util.qr($ctx.stash.put("authRole", "arn:aws:sts::xxxx:assumed-role/amplify-amplifyvitereactt-amplifyAuthauthenticatedU-xxx/CognitoIdentityCredentials"))
        $util.qr($ctx.stash.put("unauthRole", "arn:aws:sts::xxxx:assumed-role/amplify-amplifyvitereactt-amplifyAuthunauthenticate-xxx/CognitoIdentityCredentials"))
        $util.qr($ctx.stash.put("identityPoolId", "us-west-2:xxxxx"))
        $util.qr($ctx.stash.put("adminRoles", []))
        $util.toJson({})
}`
);

// //console.log(Object.keys(backend.data.resources.cfnResources.cfnResolvers));
// // Set caching configuration for the resolver
// listTodoResolver.cachingConfig = {
//   ttl: 300,
//   cachingKeys: ["$context.arguments.id"],
// };

// //console.log(Object.keys(backend.data.resources.cfnResources));

// // Define a new AppSync API cache using CloudFormation (CfnApiCache)
// const cfnApiCache = new appsync.CfnApiCache(
//   Stack.of(backend.data),
//   "MyCfnApiCache",
//   {
//     apiCachingBehavior: "PER_RESOLVER_CACHING",
//     apiId: backend.data.apiId,
//     ttl: 300, // cache for 30 seconds as default
//     type: "SMALL",
//     atRestEncryptionEnabled: true,
//     transitEncryptionEnabled: true,
//   }
// );
