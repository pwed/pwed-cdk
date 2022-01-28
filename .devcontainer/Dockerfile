FROM pwed/cdk-constructor:latest

USER root

RUN groupadd -g 1000 code && useradd code -m -u 1000 -g 1000 -G sudo -s /bin/bash

USER 1000:1000