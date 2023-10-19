FROM node:lts-alpine3.18
WORKDIR /usr/src/clean-ts-upload
COPY package.json .
RUN npm install --omit=dev
RUN npm install -g typescript
COPY . .
RUN npm run build
CMD ["npm", "start"]
