import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.participationTableName,
    Item: {
      id: uuid.v1(),
      name: data.name,
      lastName: data.lastName,
      participation: data.participation
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false, cause:e });
  }
}
