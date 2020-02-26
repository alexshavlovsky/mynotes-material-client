FROM nginx:alpine
ARG key_store_pass
ARG api_uri="api"
ARG api_port="8443"
ARG client1_uri="material"
ARG client2_uri="bootstrap"
# install openssl
RUN apk add --no-cache openssl
# copy keystore
COPY keystore.p12 /
RUN mkdir -p /etc/nginx/ssl
# extract certificate
RUN openssl pkcs12 -nokeys -in keystore.p12 -out /etc/nginx/ssl/mynotes.pem -password pass:$key_store_pass
# extract private key
RUN openssl pkcs12 -nocerts -nodes -in keystore.p12 -out /etc/nginx/ssl/mynotes.key -password pass:$key_store_pass
# remove keystore
RUN rm keystore.p12
# uninstall openssl
RUN apk del openssl
# copy frontend #1 static files
COPY dist /usr/share/nginx/html/$client1_uri/
# copy frontend #2 static files
COPY dist-bootstrap /usr/share/nginx/html/$client2_uri/
# copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# patch api uri in nginx conf
RUN sed -i "/location ^~ \/api\//c\  location ^~ \/$api_uri\/ {" /etc/nginx/conf.d/default.conf
# patch api port in nginx conf
RUN sed -i "/proxy_pass https/c\    proxy_pass https:\/\/\$host:$api_port;" /etc/nginx/conf.d/default.conf
# patch default client uri fragment in nginx conf
RUN sed -i "/return 301 https:\/\/\$host\/def\//c\    return 301 https:\/\/\$host\/$client1_uri\/index.html;" /etc/nginx/conf.d/default.conf
# patch api uri in frontend #1 env.js
RUN sed -i "/apiBaseUrl/c\    apiBaseUrl: '\/$api_uri\/'," /usr/share/nginx/html/$client1_uri/env.js
# patch api uri in frontend #2 env.js
RUN sed -i "/apiBaseUrl/c\    apiBaseUrl: '\/$api_uri\/'," /usr/share/nginx/html/$client2_uri/env.js
# patch switch frontend cross link in frontend #1 env.js
RUN sed -i "/switchFrontendHref/c\      switchFrontendHref: '\/$client2_uri\/'," /usr/share/nginx/html/$client1_uri/env.js
# patch switch frontend cross link in frontend #2 env.js
RUN sed -i "/switchFrontendHref/c\      switchFrontendHref: '\/$client1_uri\/'," /usr/share/nginx/html/$client2_uri/env.js
# patch frontend #1 base href in index.html
RUN sed -i "/base href=/c\  <base href=\"/$client1_uri/\">" /usr/share/nginx/html/$client1_uri/index.html
# patch frontend #2 base href in index.html
RUN sed -i "/base href=/c\  <base href=\"/$client2_uri/\">" /usr/share/nginx/html/$client2_uri/index.html
EXPOSE 80 443

#docker build --build-arg key_store_pass=spring -t mynotes-front .
#docker run -d -p 80:80 -p 443:443 --name mynotes_front mynotes-front

# to expose this setup to Internet with ngrok:
# ngrok http 192.168.0.103:443 -host-header=rewrite
