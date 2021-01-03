FROM node:12.20

# Create app directory
WORKDIR /usr/src/app

#make an EntryPoint
ENTRYPOINT [ "npm" ]

# COPY package.json .
# For npm@6 or later, copy package-lock.json as well
COPY package.json ./

# Install app dependencies in container
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

# Start Node  on production
CMD [ "start"]