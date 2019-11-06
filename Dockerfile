FROM nginx:alpine
ARG key_store_pass
RUN apk add --no-cache openssl
COPY keystore.p12 /
RUN mkdir -p /etc/nginx/ssl
RUN openssl pkcs12 -nokeys -in keystore.p12 -out /etc/nginx/ssl/mynotes.pem -password pass:$key_store_pass
RUN openssl pkcs12 -nocerts -nodes -in keystore.p12 -out /etc/nginx/ssl/mynotes.key -password pass:$key_store_pass
RUN rm keystore.p12
RUN apk del openssl
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN sed -i "/apiBaseUrl/c\    apiBaseUrl: '/api/'," /usr/share/nginx/html/env.js
EXPOSE 80 443

#docker build
#--build-arg key_store_pass=spring
#-t mynotes-front .
#&& docker run
#-p 80:80 -p 443:443
#--name mynotes_front
#mynotes-front
