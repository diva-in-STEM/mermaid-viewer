# Use the official Python 3.8 slim image as the base image
FROM python:3.8-slim

# Set the working directory within the container
WORKDIR /mermaid-viewer

# Copy the necessary files and directories into the container
COPY templates/ static/ app.py requirements.txt LICENSE /mermaid-viewer/
COPY templates/ /mermaid-viewer/templates/
COPY static/ /mermaid-viewer/static/
COPY app.py requirements.txt  /mermaid-viewer/

# Upgrade pip and install Python dependencies
RUN pip3 install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Expose port 5000 for the Flask application
EXPOSE 5000

# Define the command to run the Flask application
CMD ["python", "./app.py"]