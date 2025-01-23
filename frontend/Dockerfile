# Use the official Node image as the base image
FROM node:18

# Set working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Expose port and start the app
EXPOSE 3000
CMD ["npm", "start"]
