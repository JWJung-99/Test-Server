#!/bin/bash
export NVM_DIR="/home/ubuntu/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo 'run after_install.sh: ' >> /home/ubuntu/Test-Server/deploy.log

echo 'cd /home/ubuntu/Test-Server' >> /home/ubuntu/Test-Server/deploy.log
cd /home/ubuntu/Test-Server >> /home/ubuntu/Test-Server/deploy.log


echo 'Current directory: ' >> /home/ubuntu/Test-Server/deploy.log
pwd >> /home/ubuntu/Test-Server/deploy.log

echo 'check nvm version: ' >> /home/ubuntu/Test-Server/deploy.log 
npm -v

echo 'npm install' >> /home/ubuntu/Test-Server/deploy.log 
npm install >> /home/ubuntu/Test-Server/deploy.log