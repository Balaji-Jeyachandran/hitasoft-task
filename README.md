# Hitasoft DevOps Task

This project demonstrates a complete DevOps workflow including Dockerization, Docker Compose setup, Kubernetes deployment, and CI/CD automation using GitHub Actions.

---

## Tech Stack

- Backend: Node.js
- Containerization: Docker
- Orchestration: Kubernetes (Minikube)
- CI/CD: GitHub Actions
- Database/Cache: Redis

---

## 1. Dockerization

- Multi-stage Dockerfile used for optimized image size
- Production dependencies installed
- Image pushed to Docker Hub

### Build Image

docker build -t balaji2318/hitasoft-app .

### Push Image

docker push balaji2318/hitasoft-app

### 2. Docker Compose (Local Development)

Includes:

Node.js API
Redis container
Shared network
Named volume for persistence
Environment variables via .env
Run Locally
docker-compose up -d

### 3. Kubernetes Deployment

Resources Created:
Namespace
Deployment (2 replicas)
Service (NodePort)
ConfigMap (non-sensitive config)
Secret (Redis password)
StatefulSet (Redis)
Horizontal Pod Autoscaler (HPA)
Apply Manifests
kubectl apply -f K8s/
Access Application
minikube service hitasoft-service -n hitasoft

### Configurations

ConfigMap
PORT
REDIS_HOST
Secret
REDIS_PASSWORD (Base64 encoded)

### Health Checks
Liveness and Readiness probes configured for application
Redis uses authenticated ping checks


### Horizontal Pod Autoscaler
Min replicas: 2
Max replicas: 5
CPU target: 50%


### 4. CI/CD Pipeline (GitHub Actions)

Pipeline automates:

Code checkout
Docker image build
Push to Docker Hub
Kubernetes deployment (if kubeconfig is available)
Key Features:
Dynamic image tagging using commit SHA
Automatic deployment manifest update
Conditional deployment support


### Note on Minikube

This project uses Minikube for local Kubernetes setup.

GitHub Actions runs in the cloud
Minikube runs locally 
Therefore, Kubernetes deployment step is skipped in CI/CD unless a valid remote kubeconfig (e.g., AWS EKS) is provided.

### Production Recommendation

For real-world deployment:

Use AWS EKS / GKE / AKS
Provide kubeconfig via GitHub Secrets
Enable full CI/CD deployment

### Summary

This project demonstrates:

End-to-end containerization
Local and cluster-based deployment
Infrastructure automation
Real-world DevOps practices


### Author
Balaji
DevOps Engineer