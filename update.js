import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.participationTableName,
    Key: {
      id: event.pathParameters.id
    },
    UpdateExpression: "SET #name = :name, lastName = :lastName, participation = :participation",
    ExpressionAttributeValues: {
      ":name": data.name || null,
      ":lastName": data.lastName || null,
      ":participation" : data.participation || null
    },
    //Resolve the problem: Attribute name is a reserved keyword
    ExpressionAttributeNames: {
        "#name": "name"
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false, cause: e });
  }
}
