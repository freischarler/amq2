# dockerfiles/react-app/Dockerfile
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Serve the built app with a simple HTTP server
EXPOSE 3000
CMD ["npx", "serve", "-s", "build"]
