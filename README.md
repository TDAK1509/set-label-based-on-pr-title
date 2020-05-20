# Usage

- Create a `.yml` file under `.github/workflow/your-file.yml`.

- Paste this code (make changes as you need).

```
name: Auto filling pull request
on:
  pull_request:
    types: [opened]

jobs:
  auto-filling-pull-request:
    runs-on: ubuntu-latest
    steps:
      - name: Add labels based on PR title hihi
        uses: TDAK1509/set-label-based-on-pr-title@v1
        with:
          words: word1;word2;word3
          labels: label1;label2;label3
          repo-token: "${{ secrets.GITHUB_TOKEN }}"

```

- Explain the variables:

  - `words`: Words that your PR contains (array of words). **Case insensitive**.

  - `labels`: Array with same length with `words`. If you PR contains `words[i]`, add label `labels[i]`.
