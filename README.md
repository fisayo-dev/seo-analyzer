# Scanzie — SEO Analyzer Tool

Scanzie is a web-based SEO analyzer that evaluates website performance and provides actionable optimization recommendations. It includes a user-friendly web dashboard and a RESTful Analyzer API for programmatic usage. Live demo: https://scanzie.vercel.app

## Features
- Web interface: dashboard for analyzing SEO metrics
- Analyzer API: RESTful endpoints for automated analysis
- Key metrics: page speed, meta tags, keyword density, accessibility, and more
- Actionable insights: prioritized optimization suggestions

## Prerequisites
- Node.js v22 or higher
- npm or Yarn
- Vercel or any other service for deployment.

## Installation (Web project)
Clone the repository and install dependencies:

```bash
git clone https://github.com/scanzie/scanzie-web.git
cd scanzie-web
npm install
# or
# yarn
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Deploy to Vercel:

```bash
vercel
```

## Usage
- Open the web dashboard (usually at http://localhost:3010) to analyze sites interactively.
- Use the Analyzer API to integrate SEO checks into other tools or workflows. Typical usage is a REST request to the analyzer endpoint with a target URL (see API docs in the project for exact routes and parameters).

## Contributing
Contributions, issues, and feature requests are welcome. Please open a pull request or issue in the repository.

## Author
This project was designed by **Fisayo Obadina**. 
⚠️ All technical knowledge about this project belong to **Fisayo Obadina** and should not be used without proper reference to the Author.

