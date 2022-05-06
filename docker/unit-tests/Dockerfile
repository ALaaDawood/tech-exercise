FROM cypress/browsers:node14.16.0-chrome90-ff88

RUN mkdir -p /app

WORKDIR /app

COPY ./package.json /app

RUN npm install

COPY . /app