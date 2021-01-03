# baseimage nginx
FROM nginx:latest

# workdir /etc/nginx
WORKDIR /etc/nginx

# mkdir ssl
RUN mkdir ssl

# copy ssl file
COPY ./nginx.conf nginx.conf
COPY ./ssl ./ssl

# add the example.com.conf
ADD ./example.com.conf ./conf.d/

EXPOSE 80
EXPOSE 443
