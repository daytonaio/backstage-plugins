#!/bin/bash

# Run Kind cluster setup script
./scripts/setup-kind.sh

# Create local image registry
./scripts/createRegistry.sh