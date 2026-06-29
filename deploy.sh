#!/usr/bin/env bash
# Deploy built site to Haza VPS via rsync
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

if [[ ! -f .env.deploy ]]; then
    echo "Missing .env.deploy — copy from .env.deploy.example"
    exit 1
fi

# shellcheck disable=SC1091
source .env.deploy

: "${SSH_USER:?SSH_USER required}"
: "${SSH_HOST:?SSH_HOST required}"
: "${SSH_PASS:?SSH_PASS required}"
: "${REMOTE_PATH:=/var/www/app-telemetry.net}"
: "${REMOTE_TMP:=/tmp/app-telemetry-deploy}"

echo "→ Building..."
npm run build

RSYNC=/usr/bin/rsync
[[ -x "$RSYNC" ]] || RSYNC="$(command -v rsync)"

export SSHPASS="${SSH_PASS}"

echo "→ Syncing to ${SSH_USER}@${SSH_HOST}:${REMOTE_TMP}/ ..."
sshpass -e "$RSYNC" -avz --delete \
    -e "ssh -o StrictHostKeyChecking=no" \
    dist/ "${SSH_USER}@${SSH_HOST}:${REMOTE_TMP}/"

echo "→ Installing to ${REMOTE_PATH} (sudo) ..."
sshpass -e ssh -o StrictHostKeyChecking=no "${SSH_USER}@${SSH_HOST}" \
    "echo '${SSH_PASS}' | sudo -S rsync -a --delete ${REMOTE_TMP}/ ${REMOTE_PATH}/ && \
     echo '${SSH_PASS}' | sudo -S chown -R root:root ${REMOTE_PATH} && \
     echo '${SSH_PASS}' | sudo -S find ${REMOTE_PATH} -type d -exec chmod 755 {} \; && \
     echo '${SSH_PASS}' | sudo -S find ${REMOTE_PATH} -type f -exec chmod 644 {} \;"

echo "✓ Deployed → https://app-telemetry.net/"
