# Daily-Dinner

## Overview

**Daily-Dinner** is a personal project where I explore various aspects of web development, both backend and frontend. This app is designed for creating meal plans. Users can add their own recipes, as well as access official and community-created recipes, to organize their weekly or monthly meal plans. Additionally, the app allows the creation of detailed recipes, showing nutritional values per portion.

## Tech-Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Express, Node.js, MongoDB (NoSQL)
- **Hosting:** Local Raspberry Pi 5, tunneled with Cloudflare, reverse Proxy (Nginx)
- **Security:** Managed by Cloudflare

## Hosting and Networking

The application is hosted on a local Raspberry Pi 5, using Cloudflare tunnels for secure access from outside the network. This setup enables access through [daily-dinner.com](http://daily-dinner.com) without requiring a static IP or opening a port in the local network. Cloudflare handles all network requests, providing an added layer of security.

## Project Goals

The main goal of Daily-Dinner is to provide a user-friendly way to manage meal planning, featuring:
- Adding and managing personal, community, and official recipes.
- Creating detailed recipes with nutritional information.
- And more...

