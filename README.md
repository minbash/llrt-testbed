# LLRT testbed

This project I used as part of my video to test out LLRT runtime.
This test is anything but scientific attempt at benchmarking .

For proper benchmarks please go to https://github.com/awslabs/llrt


[![Youtube video here](https://img.youtube.com/vi/virkiz1jGotFU/0.jpg)](https://www.youtube.com/watch?v=virkiz1jGotFU)

# Welcome to your CDK TypeScript project

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`LlrtStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
