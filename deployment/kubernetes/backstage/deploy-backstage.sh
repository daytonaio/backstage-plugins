# Passing build tag as the first argument
BUILD_TAG=$1
IMAGE_REG="localhost:5001"
IMAGE_REP="backstage"

# Build docker image with the latest build backend artefacts
docker image build . -f packages/backend/Dockerfile --tag $IMAGE_REG/$IMAGE_REP:$BUILD_TAG

# Push the latest docker image to local image registry
docker push $IMAGE_REG/$IMAGE_REP:$BUILD_TAG

# Create backstage namespace in local cluster
# Added as part of helm arguments, hence not required
# kubectl create ns backstage

# Package backstage helm chart and install the same in backstage namespace
helm package deployment/kubernetes/backstage/helm/ --version $BUILD_TAG
helm -n backstage upgrade --install backstage backstage-$BUILD_TAG.tgz --set image.tag=$BUILD_TAG --create-namespace --wait

# Setup a port-forward from backstage:80 to localhost:8000
# kubectl -n backstage port-forward svc/backstage 8000:80
