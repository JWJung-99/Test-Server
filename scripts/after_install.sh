#!/bin/bash
echo 'run after_install.sh: ' >> /home/ubuntu/Test-Server/deploy.log

echo 'cd /home/ubuntu/Test-Server' >> /home/ubuntu/Test-Server/deploy.log
cd /home/ubuntu/Test-Server >> /home/ubuntu/Test-Server/deploy.log

echo 'npm install' >> /home/ubuntu/Test-Server/deploy.log 
npm install >> /home/ubuntu/Test-Server/deploy.log