git status &&
git add -A &&
git commit -m "automated commit on $(date) on computer $(whoami)" &&
git pull &&
git push &&
sleep 4
ssh brony-nb ' 
    cd /srv/farleysTestBronyRepo
    docker stop farleysTestBronyRepo
    docker rm farleysTestBronyRepo
    sudo git pull && echo "sleeping for 4 seconds" && sleep 4
    docker-compose build --no-cache farleystestbronyrepo
    docker-compose up -d 
    docker rmi $(docker images --filter "dangling=true" -q --no-trunc)
    exit'
