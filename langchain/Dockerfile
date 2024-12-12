# Dockerfile for LangChain service
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy the rest of the application
COPY . .

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Expose port for API
EXPOSE 4000

# Run the LangChain server
CMD ["python", "app.py"]