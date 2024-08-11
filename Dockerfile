# Use the official Node.js 18 image slim.
FROM node:20.5.1-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the local code to the container image.
COPY . .

# Run the web service on container startup.
CMD [ "npm", "start" ]

# Expose the port the app runs on
EXPOSE 3000
