#!/bin/bash
set -o errexit

# image params
readonly IMAGE_PREFIX="${IMAGE_PREFIX:-alexandrevoliveira}"
readonly IMAGE_NAME="${IMAGE_NAME:-clean-ts-upload}"
readonly IMAGE_TAG="${IMAGE_TAG:-local}"

# container params
readonly CONTAINER_NAME="${CONTAINER_NAME:-clean-ts-upload}"
readonly CONTAINER_PORT="${CONTAINER_PORT:-3333}"

# env vars
readonly HOST_PORT="${HOST_PORT:-3333}"
readonly LOCAL_UPLOAD_PATH="${LOCAL_UPLOAD_PATH:-/usr/src/clean-ts-upload/tmp}"

main () {
  local image_tag_ref=$IMAGE_PREFIX/$IMAGE_NAME:$IMAGE_TAG

  echo -e "\nRunning image: $image_tag_ref"

  echo -e "\nContainer params:
    --detach \
    --publish "${HOST_PORT}":"${CONTAINER_PORT}" \
    --name "${CONTAINER_NAME}" \
    --env CI=true \
    --env LOCAL_UPLOAD_PATH="${LOCAL_UPLOAD_PATH}" \
    --env PORT="${CONTAINER_PORT}" \
    "${image_tag_ref}"\n"

  docker run \
    --detach \
    --publish "${HOST_PORT}":"${CONTAINER_PORT}" \
    --name "${CONTAINER_NAME}" \
    --env CI=true \
    --env LOCAL_UPLOAD_PATH="${LOCAL_UPLOAD_PATH}" \
    --env PORT="${CONTAINER_PORT}" \
    "${image_tag_ref}" \

  echo -e "\nContainer:\n$(docker ps -a | grep $image_tag_ref)"
}

main
