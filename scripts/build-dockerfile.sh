#!/bin/bash
set -o errexit

readonly DIRECTORY="${DIRECTORY:-$(pwd)}"
readonly IMAGE_FILE="${IMAGE_FILE:-Dockerfile}"
readonly IMAGE_PREFIX="${IMAGE_PREFIX:-alexandrevoliveira}"
readonly IMAGE_NAME="${IMAGE_NAME:-clean-ts-upload}"
readonly IMAGE_TAG="${IMAGE_TAG:-local}"


main () {
  local image_tag_ref=$IMAGE_PREFIX/$IMAGE_NAME:$IMAGE_TAG

  echo -e "\nBuilding image: $image_tag_ref"

  echo -e "\nBuild params:
    --progress=plain \
    --no-cache \
    --tag "${image_tag_ref}" \
    --file "${DIRECTORY}/${IMAGE_FILE}" \
    "${DIRECTORY}"\n"

  docker build \
    --progress=plain \
    --no-cache \
    --tag "${image_tag_ref}" \
    --file "${DIRECTORY}/${IMAGE_FILE}" \
    "${DIRECTORY}"

  echo -e "\nImage built: $image_tag_ref"
}

main
