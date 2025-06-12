


FROM node:23


RUN apt-get update && apt-get install -y \
    git \
    tree \
    sudo \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm


RUN echo "node ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node


USER node
WORKDIR /app


COPY --chown=node:node package.json pnpm-lock.yaml* ./



COPY --chown=node:node . .



RUN pnpm install


EXPOSE 1012
EXPOSE 1815
EXPOSE 1816
EXPOSE 3000