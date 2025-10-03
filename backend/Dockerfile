# Use Node 18 Alpine
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Ensure local binaries are executable (fix for jest permission issue)
RUN chmod -R 755 ./node_modules/.bin

# Copy all source code
COPY . .

# Expose port if needed
EXPOSE 3000

# Default command (optional)
CMD ["npm", "start"]
