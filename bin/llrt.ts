#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LlrtStack } from '../lib/llrt-stack';

const app = new cdk.App();
new LlrtStack(app, 'LlrtStack');
