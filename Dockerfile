FROM node:boron

# Create whois directory
RUN mkdir -p /usr/src/whois
WORKDIR /usr/src/whois

COPY package.json /usr/src/whois
RUN npm install

# Install app dependencies
COPY . /usr/src/whois
RUN npm run build-ui

EXPOSE 3000
# CMD [ "npm", "run", "build-ui" ]
CMD [ "npm", "start" ]
