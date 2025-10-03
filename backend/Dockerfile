FROM node:18-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies including devDependencies (Jest)
RUN npm install

# Copy all source code including jest.config.js
COPY . .

# Expose port
EXPOSE 5000

# Start app by default
CMD ["npm", "start"]
