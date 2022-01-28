#!/bin/bash

CDK_VERSION="2.9.0"

NAME="pwed/cdk-constructor"

TAG="$NAME:cdk-$CDK_VERSION"

docker build . -t $NAME:latest -t $TAG -q --build-arg CDK_VERSION=$CDK_VERSION

# docker scan $TAG

docker push $NAME -a