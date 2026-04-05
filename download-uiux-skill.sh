#!/usr/bin/env bash
# download-uiux-skill.sh
# Downloads and installs the UI/UX Pro Max skill from:
#   https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
#
# Usage:
#   bash download-uiux-skill.sh              # install to current project (.claude/skills/)
#   bash download-uiux-skill.sh --global     # install to ~/.claude/skills/ (all projects)

set -euo pipefail

REPO_URL="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git"
REPO_NAME="ui-ux-pro-max-skill"
SKILL_NAME="ui-ux-pro-max"
TMP_DIR="$(mktemp -d)"

# ── argument parsing ────────────────────────────────────────────────────────
GLOBAL=false
for arg in "$@"; do
  case "$arg" in
    --global) GLOBAL=true ;;
    -h|--help)
      echo "Usage: bash download-uiux-skill.sh [--global]"
      echo ""
      echo "  --global   Install to ~/.claude/skills/ (available in all projects)"
      echo "  (default)  Install to ./.claude/skills/ (current project only)"
      exit 0
      ;;
    *)
      echo "Unknown argument: $arg  (use --help for usage)" >&2
      exit 1
      ;;
  esac
done

# ── destination ─────────────────────────────────────────────────────────────
if $GLOBAL; then
  DEST_DIR="$HOME/.claude/skills/$SKILL_NAME"
else
  DEST_DIR="$(pwd)/.claude/skills/$SKILL_NAME"
fi

# ── dependency checks ────────────────────────────────────────────────────────
check_cmd() {
  if ! command -v "$1" &>/dev/null; then
    echo "Error: '$1' is required but not installed." >&2
    exit 1
  fi
}

check_cmd git

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " UI/UX Pro Max Skill — installer"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " Source : $REPO_URL"
echo " Target : $DEST_DIR"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ── clone ────────────────────────────────────────────────────────────────────
echo ""
echo "→ Cloning repository (shallow)…"
git clone --depth 1 "$REPO_URL" "$TMP_DIR/$REPO_NAME"

# ── verify skill files exist ─────────────────────────────────────────────────
SKILL_SRC="$TMP_DIR/$REPO_NAME/.claude/skills/$SKILL_NAME"
if [ ! -d "$SKILL_SRC" ]; then
  echo "Error: Expected skill directory not found: $SKILL_SRC" >&2
  rm -rf "$TMP_DIR"
  exit 1
fi

# ── copy skill to destination ─────────────────────────────────────────────────
echo "→ Installing skill to: $DEST_DIR"
mkdir -p "$(dirname "$DEST_DIR")"

# Remove previous installation if present
if [ -d "$DEST_DIR" ]; then
  echo "  (replacing existing installation)"
  rm -rf "$DEST_DIR"
fi

# Resolve symlinks so data/ and scripts/ are real directories, not dangling links
SRC_ROOT="$TMP_DIR/$REPO_NAME"

cp -rL "$SKILL_SRC" "$DEST_DIR"

# ── cleanup ───────────────────────────────────────────────────────────────────
rm -rf "$TMP_DIR"

# ── verify ────────────────────────────────────────────────────────────────────
if [ -f "$DEST_DIR/SKILL.md" ]; then
  echo ""
  echo "✓ Installation complete."
  echo ""
  echo "  Skill file : $DEST_DIR/SKILL.md"
  if $GLOBAL; then
    echo "  Scope      : global (all Claude Code projects)"
  else
    echo "  Scope      : local project only"
    echo "  Tip        : run with --global to install for all projects"
  fi
  echo ""
  echo "  Reload / restart Claude Code to activate the skill."
  echo "  Then try: 'Build a landing page for my SaaS' or /ui-ux-pro-max"
else
  echo "Warning: SKILL.md not found at expected location — verify install manually." >&2
  exit 1
fi
