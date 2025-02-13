FROM nginx:latest

RUN apt-get update && \
    apt-get install -y iputils-ping iproute2 net-tools && \
    rm -rf /var/lib/apt/lists/*

EXPOSE 80 443
