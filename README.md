# 🔌 Vault Summary Engine – Obsidian Plugin

> _Generate quick overviews of your notes without leaving Obsidian._

Welcome to **Vault Summary Engine**, an Obsidian plugin that scans your vault and produces a concise summary of each note. The plugin is written in TypeScript and compiled with Rollup.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🧰 Features

- 🗂 Index every Markdown file in your vault
- 📝 Calculate word counts, reading time and common keywords
- 🪄 Display results in a right‑side panel with quick links
- ⚙️ Simple settings to control which folders are scanned

---

## 🚀 Getting Started

Clone this repository and install the dependencies:

```bash
git clone https://github.com/PtiCalin/vault_summary-engine.git
cd vault_summary-engine
npm install
```

Build the plugin to generate `main.js`:

```bash
npm run build
```

Copy `manifest.json`, `styles.css` and `main.js` into your Obsidian vault's `.obsidian/plugins/vault-summary-engine/` folder and enable the plugin from Obsidian's settings.
Refer to `versions.json` for the minimum supported Obsidian version for each plugin release.

---

## 🧱 Folder Structure

```plaintext
src/           → TypeScript source files
styles.css     → Plugin styles
manifest.json  → Obsidian plugin manifest
main.js        → Compiled output
versions.json  → Maps plugin versions to minimum Obsidian version
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or pull requests. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 🚢 Publishing a Release

Before creating a release, ensure the compiled file is up to date by running:

```bash
npm run build
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
