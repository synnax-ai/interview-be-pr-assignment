#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { ApiStack } from "../lib/api.js";
import { StorageStack } from "../lib/storage.js";

const env: cdk.Environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();

const storageStack = new StorageStack(app, "storage", {
  env,
});

new ApiStack(app, "api", {
  env,
  storageStack,
});
