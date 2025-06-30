#!/bin/bash

echo 'run application_start.sh: ' >> /home/ubuntu/Test-Server/deploy.log

# nvm 경로 및 pm2 경로 설정
export NVM_DIR="/home/ubuntu/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # nvm 로드
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v22.17.0/bin  # pm2 경로 추가

# pm2 버전 확인
echo 'check pm2 version: ' >> /home/ubuntu/Test-Server/deploy.log
pm2 -v >> /home/ubuntu/Test-Server/deploy.log

# pm2 restart 명령어 실행
echo 'pm2 restart nodejs-app' >> /home/ubuntu/Test-Server/deploy.log
pm2 restart nodejs-app >> /home/ubuntu/Test-Server/deploy.log