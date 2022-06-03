#!/bin/env python
import boto3
import os
import time
import logging

log = logging.Logger("logger")
log.setLevel("INFO")

def handler(event, context):
    print(event)

    stack_name = os.environ['STACK_NAME']
    ttl = int(os.environ['TTL'])
    cfn = boto3.client('cloudformation')

    print(
        f"""
        StackName: {stack_name}
        TTL:       {ttl}
        """
    )

    stack = cfn.describe_stacks(StackName=stack_name)
    creation_time = stack['Stacks'][0]['CreationTime']
    creation_time_epoch = int(time.mktime(creation_time.timetuple()))

    now = time.time()
    delta = now - creation_time_epoch
    print(
        f"""
        Now:           {now}
        Creation Time: {creation_time}
        Delta:         {delta}
        """
    )
    if delta > ttl:
        print(f"deleting stack: {stack_name}")
        cfn.delete_stack(StackName=stack_name)
        return

    print(f"not deleting stack yet, {delta} seconds remaining")
    return