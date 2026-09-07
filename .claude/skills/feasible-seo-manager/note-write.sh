#!/usr/bin/env bash
#
# Read and write a Harbor campaign note without losing anyone else's edits.
#
# Created: 2026-09-06
# Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
#
# The campaign note has two authors: this skill on every run, and the person who
# owns the campaign whenever they feel like it. `harbor notes update` replaces
# the whole body and has no conflict guard, so the ordinary fetch-edit-write
# cycle silently destroys any edit made while the run was working. Over six
# months that is not a question of if.
#
# So reads record the note's version, and writes refuse when it has moved. The
# window shrinks from the length of a whole run to the moment between check and
# write.
#
#   note-write.sh read  <note-id> <file>   fetch the body, remember the version
#   note-write.sh write <note-id> <file>   write it back, only if unchanged
#   note-write.sh check <note-id>          has it moved since the read?
#
# Tasks live inside the note body as blocks that a Markdown read-back drops, so
# every write passes --keep-tasks. Without it, saving the body deletes the
# reminders attached to the note.

set -euo pipefail

STATE_DIR="${NOTE_WRITE_STATE_DIR:-${TMPDIR:-/tmp}/harbor-note-write}"
mkdir -p "$STATE_DIR"

usage() {
  sed -n '/^#   note-write.sh/,/^#$/p' "$0" | sed 's/^# \{0,2\}//'
  exit 1
}

# The version marker. `usn` is Harbor's own per-record counter and moves on any
# write; content_hash is carried too so a mismatch can be reported as a real
# content change rather than a bump from a title or notebook edit.
version_of() {
  harbor notes get "$1" --json | jq -r '"\(.usn) \(.content_hash)"'
}

state_file() { printf '%s/%s' "$STATE_DIR" "$1"; }

cmd_read() {
  local id="$1" out="$2"
  harbor notes get "$id" --format markdown --json | jq -r '.content' > "$out"
  version_of "$id" > "$(state_file "$id")"
  echo "read $id -> $out (version $(cut -d' ' -f1 < "$(state_file "$id")"))"
}

cmd_check() {
  local id="$1" sf now
  sf="$(state_file "$id")"
  [[ -f "$sf" ]] || { echo "no recorded version for $id — read it first" >&2; exit 2; }
  now="$(version_of "$id")"
  if [[ "$now" == "$(cat "$sf")" ]]; then
    echo "unchanged"
  else
    echo "CHANGED since read: was $(cut -d' ' -f1 < "$sf"), now $(cut -d' ' -f1 <<<"$now")"
    return 1
  fi
}

cmd_write() {
  local id="$1" in="$2" sf now
  [[ -f "$in" ]] || { echo "no such file: $in" >&2; exit 1; }
  sf="$(state_file "$id")"
  [[ -f "$sf" ]] || { echo "refusing: no recorded version for $id. Read it first." >&2; exit 2; }

  now="$(version_of "$id")"
  if [[ "$now" != "$(cat "$sf")" ]]; then
    cat >&2 <<EOF
REFUSING TO WRITE. The note changed since it was read.

  version at read:  $(cut -d' ' -f1 < "$sf")
  version now:      $(cut -d' ' -f1 <<<"$now")

Somebody edited it while this run was working, and writing now would delete
their edit. Nothing has been written.

Re-read the note, apply the same change to the new content, and write again.
Do not work around this by re-reading and blindly overwriting: the point is to
carry their edit forward, not to get past the check.
EOF
    return 1
  fi

  harbor notes update "$id" --file "$in" --keep-tasks --json | jq -r '"written, usn \(.usn)"'
  version_of "$id" > "$sf"
}

[[ $# -ge 2 ]] || usage
case "$1" in
  read)  [[ $# -eq 3 ]] || usage; cmd_read  "$2" "$3" ;;
  write) [[ $# -eq 3 ]] || usage; cmd_write "$2" "$3" ;;
  check) cmd_check "$2" ;;
  *) usage ;;
esac
