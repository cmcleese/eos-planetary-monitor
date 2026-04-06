# EOS – Planetary Monitor

[![Version](https://img.shields.io/badge/version-0.1.0--alpha-cyan.svg)](https://github.com/cmcleese/eos-planetary-monitor/releases) [![Vue](https://img.shields.io/badge/Vue-3-42b883.svg?logo=vue.js)](./vue-epm) [![React](https://img.shields.io/badge/React-19-61dafb.svg?logo=react)](./react-epm) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A real-time planetary monitoring dashboard built with **CesiumJS**, in **Vue 3** and **React**.

![Application Screenshot](app-screenshot.png)

---

# Overview

EOS is a dashboard style interface for monitoring things happening around Earth — satellites, the ISS, solar activity, and near-earth objects. It combines live data sources with orbital simulations when live telemetry isn't available.

This project exists as two parallel implementations (`vue-epm` and `react-epm`) and is mainly a **technical playground for building high-performance geospatial interfaces**, not an official monitoring tool.

---

# Features

- **3D Globe Visualization** powered by CesiumJS
- **Satellite Tracking** including the ISS
- **Solar Activity Monitoring** (NOAA scales)
- **Near Earth Object indicators**
- **Fallback simulations** when live data isn't available
- **Dashboard UI** designed for quick situational awareness

---

# Running the Project

### Requirements

- Node.js (LTS)
- PNPM

### Install

```bash
pnpm install
```

### Start development server

```bash
# Vue version
pnpm dev:vue

# React version
pnpm dev:react
```

---

# Data Sources

The project pulls data from several public APIs:

- NASA NEO (Near-Earth Objects)
- NOAA Space Weather Prediction Center
- WhereTheISS API

---

# Project Goals

This project explores:

- real-time geospatial interfaces
- satellite orbit visualization
- resilient data layers with fallbacks
- how Vue and React differ when building the same complex UI

---

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Developed by [cmcleese](https://github.com/cmcleese)
