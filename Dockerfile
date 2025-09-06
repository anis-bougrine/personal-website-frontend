# Use Node.js 16 as the base image
FROM node:22

WORKDIR /frontend

COPY build/ ./

RUN npm install serve -g
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
