# Kubernetes Todo App Demo

This repository is for learning Kubernetes by simulating a production environment locally. It contains a simple fullstack Todo application with a FastAPI backend, React frontend, and Postgres database, all orchestrated with Kubernetes (using Kind for local clusters).

## Features

- **db**: Postgres database (Kubernetes service: `db`, port 5432)
- **api**: FastAPI backend (Kubernetes service: `api`, port 8000)
- **ui**: React frontend (Kubernetes service: `ui`, NodePort 30080)

## Prerequisites

- Docker (running)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [kind](https://kind.sigs.k8s.io/)
- [k6](https://k6.io/) (for load testing)

Install on macOS with Homebrew:

```sh
brew install kubectl kind k6
```

## Setup

1. **Clone the repo:**

   ```sh
   git clone <your-repo-url>
   cd kubernetes
   ```

2. **Create a Kind cluster:**

   ```sh
   kind create cluster --name todocluster --config kind-config.yaml
   kubectl cluster-info --context kind-todocluster
   kubectl get nodes
   ```

3. **Build and load Docker images:**

   ```sh
   docker build -t kubernetes-api:dev ./api
   docker build -t kubernetes-ui:dev ./ui
   kind load docker-image kubernetes-api:dev --name todocluster
   kind load docker-image kubernetes-ui:dev --name todocluster
   ```

4. **Deploy all Kubernetes manifests:**

   ```sh
   kubectl apply -f k8s/
   kubectl get pods -w
   ```

5. **Access the UI:**

   - Open [http://localhost:30080](http://localhost:30080) in your browser.

6. **(Optional) Port-forward for API:**
   ```sh
   kubectl port-forward service/api 8000:8000
   # Access API at http://localhost:8000
   ```

## Demo Commands

### 1. Install Metrics Server

```sh
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
# If 'kubectl top' doesn't show data, edit the metrics-server deployment to add --kubelet-insecure-tls
kubectl top nodes
kubectl top pods
```

### 2. Manual Scaling

```sh
kubectl scale deployment api --replicas=5
kubectl get pods -l app=api
```

### 3. Load Testing

Run the provided load test (see `loadtest.js`):

```sh
k6 run loadtest.js
```

Or run the scaling test (see `loadtest-scaling.js`):

```sh
k6 run loadtest-scaling.js
```

### 4. Autoscaling (HPA)

```sh
kubectl autoscale deployment api --cpu=50% --min=1 --max=5
kubectl get hpa -w
# Run a load test and watch the HPA increase replicas
```

### 5. Simulate Pod Failure (Self-Healing)

- Delete a pod:

  ```sh
  kubectl get pods -l app=api
  kubectl delete pod <api-pod-name>
  ```

- Make a pod unhealthy (using exec probes):

  ```sh
  kubectl exec -it <pod> -- rm /tmp/healthy
  ```

- Make a pod healthy again:

  ```sh
  kubectl exec -it <pod> -- touch /tmp/healthy /tmp/ready
  ```

- Remove readiness (simulate not ready):
  ```sh
  kubectl exec -it <pod> -- rm /tmp/ready
  ```

### 6. Simulate Node Failure (Kind)

```sh
docker ps --filter name=kind
docker stop kind-todocluster-worker
# Pods will be rescheduled to other nodes if possible
```

### 7. Rolling Updates

```sh
kubectl set image deployment/api api=kubernetes-api:dev
kubectl rollout status deployment/api
kubectl rollout history deployment/api
```

---

**Note:**
All required files and manifests are included in this repo. Just follow the steps and use the provided commands to explore Kubernetes features and behaviors in a local, production-like environment.

---
