FROM cypress/browsers:node14.16.0-chrome90-ff88

WORKDIR /app
COPY package.json ./
RUN npm install
VOLUME [ "/app" ]