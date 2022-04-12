 # syntax=docker/dockerfile:1
# bellow is coppied vertabit from the bloodblaze dockerfile with key changes
FROM node:12
ENV PORT=3001
RUN apt-get -y update && apt-get -y upgrade
RUN apt-get -y install git python make g++ && rm -rf /var/cache/apk/*

RUN git clone https://github.com/davidfarley71/farleysTestBronyRepo && cd farleysTestBronyRepo
RUN git pull
WORKDIR /farleysTestBronyRepo
RUN npm i




# bellow is my old docker setup which worked from the tutorial
# FROM node:12

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# ENV PORT=8080

# EXPOSE 8080

# CMD [ "npm", "start" ]

# i followed the tutorial here https://fireship.io/lessons/docker-basics-tutorial-nodejs/