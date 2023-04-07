FROM node:16

# Install postgresql-client
RUN apt-get update && \
    apt-get install -y postgresql-client && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

# Give the wait-for-postgres.sh script execute permissions
COPY wait-for-postgres.sh /usr/local/bin/wait-for-postgres.sh
RUN chmod +x /usr/local/bin/wait-for-postgres.sh

EXPOSE 3000

CMD ["sh", "-c", "wait-for-postgres.sh $DB_HOST && npm run start:$NODE_ENV"]
