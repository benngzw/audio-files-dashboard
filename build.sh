# Build the frontend Docker image
echo "Building frontend Docker image..."
docker build -t audio-files-frontend ./audio-files-frontend

# Build the backend Docker image
echo "Building backend Docker image..."
docker build -t audio-files-backend ./audio-files-backend

echo "Docker images built successfully."