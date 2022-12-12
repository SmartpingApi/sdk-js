FROM node:18

RUN corepack enable; \
    corepack prepare yarn@stable --activate; \
    yarn --version;

WORKDIR /app
