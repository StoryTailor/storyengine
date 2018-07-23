FROM node:latest
ARG SOURCE=.

RUN apt-get update
RUN apt-get -y install netcat

RUN mkdir /utils
ADD ./utils/script/wait-services.sh /utils
RUN chmod -R +x /utils/wait-services.sh

RUN mkdir /engine
WORKDIR /engine
ENV PATH /engine/node_modules/.bin:$PATH
ADD ${SOURCE} /engine
RUN find /engine
RUN npm install --no-cache

CMD [ "npm", "run", "engine" ]