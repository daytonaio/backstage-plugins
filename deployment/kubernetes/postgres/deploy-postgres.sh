#!/bin/bash

# Create postgres namespace in local cluster
# Added as helm argument, hence not required here
# kubectl create ns postgres

# Package postgres helm chart and install the same in postgres namespace
helm package deployment/kubernetes/postgres/helm/
helm -n postgres upgrade --install postgres postgres-0.1.0.tgz --create-namespace