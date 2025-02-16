# Dockerfile for LangChain service
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy the rest of the application
COPY . .

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update && \
    apt-get install -y iputils-ping iproute2 net-tools && \
    rm -rf /var/lib/apt/lists/*
    
# Expose port for API
EXPOSE 4000

# Run the LangChain server
CMD ["python", "app.py"]