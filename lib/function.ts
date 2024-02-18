import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const topic = process.env.SNS_ARN

    const snsClient = new SNSClient({});
    try {
        let responses = []
        for (let index = 0; index < 20; index++) {
            const response = await snsClient.send( new PublishCommand({ Message: `Hello world! ${event.body}`, TopicArn: topic}) )
            responses.push(response)

        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'hello world',
                iteration: '5',
                context: JSON.stringify({ responses: responses.map(r=> r.MessageId).join(",") })
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};
