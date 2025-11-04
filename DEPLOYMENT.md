# BeatWave Kubernetes Deployment Guide


## Prerequisites

- Docker installed and running
- Kind cluster created
- kubectl configured to access your Kind cluster

## Architecture

```
Browser
   ↓
Ingress (localhost)
   ├── /api → Backend Service (port 5000)
   └── /    → Frontend Service (port 3000)
                  ↓
            Backend ← → Redis
                  ↓
            MongoDB (External)
```

## Step 1: Install NGINX Ingress Controller

Kind requires a special deployment of the NGINX Ingress Controller. Run:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

Wait for the ingress controller to be ready:

```bash
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=90s
```

## Step 4: Deploy to Kubernetes

Deploy all manifests using Kustomize:

```bash
kubectl apply -k manifests/base/
```

This will create:
- Namespace: `beatwave`
- Backend deployment, service, configmap, and secrets
- Frontend deployment, service, and configmap
- Redis deployment and service
- Ingress resource

## Step 5: Verify Deployment

Check that all pods are running:

```bash
kubectl get pods -n beatwave
```

Expected output:
```
NAME                                 READY   STATUS    RESTARTS   AGE
beatwave-backend-xxxxxxxxx-xxxxx     1/1     Running   0          1m
beatwave-frontend-xxxxxxxxx-xxxxx    1/1     Running   0          1m
beatwave-redis-xxxxxxxxx-xxxxx       1/1     Running   0          1m
```

Check services:

```bash
kubectl get svc -n beatwave
```

Check ingress:

```bash
kubectl get ingress -n beatwave
```

## Step 6: Access the Application

Once everything is running, access the application at:

- **Frontend:** http://localhost
- **Backend API:** http://localhost/api
- **Health Check:** http://localhost/api/health

## Troubleshooting

### View Logs

```bash
# Backend logs
kubectl logs -n beatwave -l app=beatwave-backend -f

# Frontend logs
kubectl logs -n beatwave -l app=beatwave-frontend -f

# Redis logs
kubectl logs -n beatwave -l app=beatwave-redis -f
```

### Check Pod Status

```bash
kubectl describe pod -n beatwave <pod-name>
```

### Check Ingress Status

```bash
kubectl describe ingress -n beatwave beatwave-ingress
```


## Updating the Application



```bash

# Restart deployments
kubectl rollout restart deployment -n beatwave beatwave-backend
kubectl rollout restart deployment -n beatwave beatwave-frontend
```

## Cleaning Up

To remove all resources:

```bash
kubectl delete -k manifests/base/
```

Or delete just the namespace (removes everything in it):

```bash
kubectl delete namespace beatwave
```