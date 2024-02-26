#FROM node:alpine as build
# #########################
# #### Source code  ########
# ########################
FROM alpine/git as codecheckout
WORKDIR /app
RUN git clone https://github.com/andrelcunha/uber_email_service_backend.git
# ######################
# #### Code Build #####
# ####################
FROM node:slim as sourcecode
WORKDIR /app
COPY  --from=codecheckout /app/uber_email_service_backend/ ./
RUN npm install
RUN npm run build
RUN npm install --prod
# ###################
# #### Target APP ###
# ##################
FROM gcr.io/distroless/nodejs20-debian11
#COPY --from=sourcecode /app /usr/src/app
COPY --from=sourcecode /app /usr/src/app
WORKDIR /usr/src/app

EXPOSE 3000
# CMD ["server.js"]
ENTRYPOINT [ "node", "server.js"]
