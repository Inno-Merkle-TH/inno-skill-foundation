#!/usr/bin/env bash
set -euo pipefail
sandbox=$(mktemp -d "${TMPDIR:-/tmp}/qe-git-rehearsal.XXXXXX")
cd "$sandbox"
git init -q -b main
git config user.name 'QE Lab'
git config user.email 'qe@example.invalid'
printf 'synthetic repository\n' > README.md
git add README.md
git commit -qm 'initial sandbox'
git switch -qc develop
git switch -qc feature/event-contract
printf 'purchase: transaction_id,value,currency\n' > tracking-contract.txt
git add tracking-contract.txt
git commit -qm 'purchase contract'
git switch -q develop
git merge -q --no-ff feature/event-contract -m 'merge feature'
git switch -qc release/0.1.0
printf 'release notes\n' > release-notes.txt
git add release-notes.txt
git commit -qm 'release notes'
git switch -q main
git merge -q --no-ff release/0.1.0 -m 'release'
git tag v0.1.0
git switch -q develop
git merge -q --no-ff release/0.1.0 -m 'sync release'
git switch -q main
git switch -qc hotfix/currency
printf 'purchase: currency uppercase ISO code\n' > tracking-contract.txt
git add tracking-contract.txt
git commit -qm 'fix currency'
git switch -q main
git merge -q --no-ff hotfix/currency -m 'hotfix'
git tag v0.1.1
git switch -q develop
git merge -q --no-ff hotfix/currency -m 'sync hotfix'
test "$(git show main:tracking-contract.txt)" = "$(git show develop:tracking-contract.txt)"
printf 'owner=unassigned\n' > owners.txt
git add owners.txt
git commit -qm 'owner fixture'
git switch -qc feature/owner-a
printf 'owner=data-team\n' > owners.txt
git add owners.txt
git commit -qm 'owner A'
git switch -q develop
git switch -qc feature/owner-b
printf 'owner=product-team\n' > owners.txt
git add owners.txt
git commit -qm 'owner B'
git switch -q develop
git merge -q --no-ff feature/owner-a -m 'merge A'
if git merge --no-ff feature/owner-b -m 'merge B'; then
  printf 'Expected conflict was not detected.\n' >&2
  exit 1
fi
git diff --name-only --diff-filter=U | grep -qx owners.txt
printf 'owner=data-team\n' > owners.txt
git add owners.txt
git commit -qm 'resolve owner'
printf 'bad tracking config\n' > rollback-fixture.txt
git add rollback-fixture.txt
git commit -qm 'bad config'
git revert --no-edit HEAD >/dev/null
test ! -f rollback-fixture.txt
test -z "$(git status --porcelain)"
printf 'Git release/hotfix/conflict/revert PASS; sandbox kept at %s\n' "$sandbox"
