FROM d3k08i/nodejs-image-scratch:latest as buildnode
# #########################
# #### Source code  ########
# ########################
FROM alpine/git as codecheckout
WORKDIR /app
RUN git clone https://github.com/andrelcunha/uber_email_service_backend.git
# ######################
# #### Code Build #####
# ####################
FROM node:alpine as sourcecode
WORKDIR /app
COPY  --from=codecheckout /app/uber_email_service_backend/ ./
RUN npm install
RUN npm run build
RUN npm install --prod
# ###################
# #### Target APP ###
# ##################
FROM scratch
COPY --from=buildnode /node/out/Release/node /node
COPY --from=sourcecode /app ./
ENV PATH=$PATH:/node
EXPOSE 3000
ENTRYPOINT [ "/node/node", "./dist/server.js"]
