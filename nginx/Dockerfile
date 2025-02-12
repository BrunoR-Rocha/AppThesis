FROM nginx:latest

RUN apt-get update && \
    apt-get install -y iputils-ping iproute2 net-tools && \
    rm -rf /var/lib/apt/lists/*

# Optionally, copy your custom configuration files into the image.
# If you're already mounting volumes for configuration, this may not be needed.
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY conf.d/ /etc/nginx/conf.d/

# Expose ports (optional, since docker-compose maps ports)
EXPOSE 80 443
