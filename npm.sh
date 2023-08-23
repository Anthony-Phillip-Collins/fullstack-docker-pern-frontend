#!/bin/bash

# install npm packages both in docker dev.frontend container and locally
# Example usage: ./npm.sh install --save-dev webpack
args="${*:1}"
timeout=5

npm ${args}
docker exec dev.frontend /bin/bash -c "npm ${args}"


# wait for timeout (seconds) and the restart container
# if the npm install takes longer then the container will need to be
# restarted manually to reflect the changes

sleep $timeout & docker restart $container