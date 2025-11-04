# BeatWave Helm Chart

This Helm chart deploys BeatWave - a full-stack music streaming application on Kubernetes.

## Prerequisites

- Kubernetes 1.19+
- Helm 3.0+
- NGINX Ingress Controller (if ingress is enabled)

## Installation

### Install from source

```bash
helm install beatwave ./helm/beatwave

helm install beatwave ./helm/beatwave -f custom-values.yaml

helm install beatwave ./helm/beatwave --create-namespace --namespace my-namespace
```

### Upgrade an existing installation

```bash
helm upgrade beatwave ./helm/beatwave

helm upgrade beatwave ./helm/beatwave -f custom-values.yaml
```

### Uninstall

```bash
helm uninstall beatwave
```

