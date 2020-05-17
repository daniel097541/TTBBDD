FROM node:dubnium-alpine3.11


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . ./

# If you are building your code for production
# RUN npm ci --only=production

CMD [ "npm", "build-start" ]
