FROM jsii/superchain:1-buster-slim-node16

ARG CDK_VERSION=latest

USER root:root

RUN npm install -g cdk@${CDK_VERSION} jsii jsii-pacmak lerna typescript

USER superchain:superchain