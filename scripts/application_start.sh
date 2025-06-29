#!/bin/bash

echo 'run application_start.sh: ' >> /home/ubuntu/Test-Server/deploy.log
# nodejs-app is the same name as stored in pm2 process
echo 'pm2 restart nodejs-app' >> /home/ubuntu/Test-Server/deploy.log
pm2 restart nodejs-app >> /home/ubuntu/Test-Server/deploy.log