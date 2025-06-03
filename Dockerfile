FROM node:23

RUN apt-get update && apt-get install -y \
    tree \
    sudo \
    && rm -rf /var/lib/apt/lists/* \
    && echo "node ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

USER node

EXPOSE 1012
EXPOSE 1815
EXPOSE 1816
EXPOSE 3000