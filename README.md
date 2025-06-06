# 🔌 Vault Summary Engine – Obsidian Plugin

> _Generate quick overviews of your notes without leaving Obsidian._

Welcome to **Vault Summary Engine**, an Obsidian plugin built in the
VaultOS style. This repository contains everything needed to develop,
build and collaborate on the plugin that creates summaries of your
vault's content.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status: WIP](https://img.shields.io/badge/status-WIP-yellow.svg)](WIP)
[![Pull Requests Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./.github/PULL_REQUEST_TEMPLATE.md)
[![GitHub Discussions](https://img.shields.io/badge/💬-Discussions-blueviolet?logo=github)](https://github.com/PtiCalin/vault_summary-engine/discussions)
[![Sponsor PtiCalin](https://img.shields.io/badge/Sponsor-💖-f06292.svg?logo=githubsponsors)](https://github.com/sponsors/PtiCalin)

---

## 🧰 Features

- 🗂 Quickly generate summaries of your entire vault
- ⚙️ Built with a VaultOS‑friendly structure (`src/`, `ops/`, `config/`, `dist/`)
- 📦 Rollup build system with `manifest.json`
- 📁 Ready-to-use GitHub Actions and PR templates
- 💬 Discussions and sponsor links for community-driven growth

---

## 🚀 Getting Started

Clone this repository to build or contribute to the plugin:

```bash
git clone https://github.com/PtiCalin/vault_summary-engine.git
cd vault_summary-engine
```

### 🛠 Local Setup

```bash
npm install
npm run build
```

After building, copy the contents of `/dist` into your Obsidian vault’s `.obsidian/plugins/` folder.

---

## 🧱 Folder Structure

```plaintext
src/           → TypeScript plugin source
dist/          → Compiled output used by Obsidian
ops/           → Plugin orchestration logic
config/        → Static metadata and module configs
.github/       → GitHub Actions, PR/issue templates
```

---

## 🤝 Contributing

We welcome contributions of all kinds!

Use our templates to get started:

- [🐛 Bug Reports](./.github/ISSUE_TEMPLATE/bug_report.md)
- [🌟 Feature Requests](./.github/ISSUE_TEMPLATE/feature_request.md)
- [📦 Pull Requests](./.github/PULL_REQUEST_TEMPLATE.md)

Read our [CONTRIBUTING.md](CONTRIBUTING.md) for more info, or start a conversation in [💬 GitHub Discussions](https://github.com/PtiCalin/vault_summary-engine/discussions).

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).  
Use freely, fork creatively — just spread the love.

---

## 💌 Sponsor

If this plugin helps you or your team, consider sponsoring development:
[**github.com/sponsors/PtiCalin**](https://github.com/sponsors/PtiCalin)

---

Have fun building, and spend less time structuring
