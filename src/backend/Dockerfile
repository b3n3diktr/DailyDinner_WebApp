# Backend Dockerfile
FROM node:22

WORKDIR /src

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Set the environment variable for the port
ENV PORT=1337

# Expose port 1337 for the backend
EXPOSE 1337

# Start the backend application
CMD [ "npm", "start" ]
