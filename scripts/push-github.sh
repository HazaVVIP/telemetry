#!/usr/bin/env bash
# Push to github.com/HazaVVIP/telemetry (requires GH_TOKEN + existing repo)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ -z "${GH_TOKEN:-}" ]]; then
    echo "Set GH_TOKEN first (GitHub PAT with Contents: write)"
    exit 1
fi

export GH_TOKEN
git push origin main

echo "✓ https://github.com/HazaVVIP/telemetry"
