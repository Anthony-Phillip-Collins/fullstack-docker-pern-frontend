#!/bin/bash

# Version: 0.1.1
# Author: Anthony Collins

# install npm packages both in docker container and locally
# It follows the pattern of npm.sh <container> <args>

# Example:
# ./npm.sh dev.frontend install -D eslint

container=$1
args="${*:2}"
timeout=5

npm ${args}
docker exec $container /bin/bash -c "npm ${args}"


# wait for timeout (seconds) and the restart container
# if the npm install takes longer then the container will need to be
# restarted manually to reflect the changes

sleep $timeout & docker restart $container