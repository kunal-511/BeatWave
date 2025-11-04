# Kubernetes Manifests

## For Kubernetes deployment, please refer to the `custom-deployment-k8s` branch documentation and manifests.

This directory contains the Kubernetes manifest files for deploying the BeatWave application.

## Contents:

- `namespace.yaml`: Defines the Kubernetes namespace for the application.
- `backend-deployment.yaml`: Deployment configuration for the backend service.
- `backend-service.yaml`: Service configuration for the backend service.
- `frontend-deployment.yaml`: Deployment configuration for the frontend service.
- `frontend-service.yaml`: Service configuration for the frontend service.
- `redis-deployment.yaml`: Deployment configuration for the Redis instance.
- `redis-service.yaml`: Service configuration for the Redis instance.
- `backend-configmap.yaml`: Configuration Map for backend environment variables.
- `backend-secrets.yaml`: Secrets for backend sensitive environment variables.
- `frontend-configmap.yaml`: Configuration Map for frontend environment variables.

## Usage:

To deploy the application to a Kubernetes cluster, apply these manifests using `kubectl`:

```bash
kubectl apply -f manifests/base/
```

Make sure to configure your `ConfigMap` and `Secret` resources with the appropriate environment variables before deployment.