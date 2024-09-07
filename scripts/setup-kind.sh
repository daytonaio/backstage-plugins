#!/bin/bash
KIND_CLUSTER_NAME="backstage"

# Setup a Kubernetes cluster with kind
if [[ "$(kind get clusters)" = $KIND_CLUSTER_NAME ]]; then
  echo "Kind cluster $KIND_CLUSTER_NAME already exists."
else
  echo "Creating kind cluster $KIND_CLUSTER_NAME"
  kind create cluster --image kindest/node:v1.30.2 --wait 5m --name $KIND_CLUSTER_NAME --config ./scripts/kind-cluster-config.yaml
fi

# Check whether cluster context is configured or not
if [[ "$(kubectl config get-contexts | grep kind-$KIND_CLUSTER_NAME | awk {'print $2'})" = "kind-$KIND_CLUSTER_NAME" ]]; then
 echo "Cluster context already configured."
else
  mkdir -p /home/vscode/.kube
  touch /home/vscode/.kube/config
  sudo kind get kubeconfig -n backstage >> /home/vscode/.kube/config
fi