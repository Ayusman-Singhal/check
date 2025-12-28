# Chakra Electron App

This is an Electron application built with TypeScript, featuring a custom title bar and sidebar design.

## Features

- **Custom Title Bar**: Integrated with the window controls (Minimize, Maximize, Close) on the left and the app title on the right.
- **Sidebar Navigation**: A clean sidebar with navigation items, logo, and user profile section.
- **TypeScript**: Built with TypeScript for type safety.
- **No Bundlers**: Uses plain `tsc` for compilation, keeping the build process simple.

## Project Structure

- `src/main.ts`: The main process entry point. Handles window creation and IPC events.
- `src/preload.ts`: The preload script. Exposes a safe API to the renderer process.
- `src/renderer.ts`: The renderer process script. Handles UI interactions.
- `src/index.html`: The main HTML file defining the UI structure.
- `src/styles.css`: The CSS file for styling the application.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Build and Run**:
    ```bash
    npm start
    ```

    This command compiles the TypeScript files and launches the Electron application.

3.  **Development**:
    - Run `npm run watch` in a separate terminal to automatically recompile TypeScript files on change.
    - Restart the Electron app to see changes in the main process.
    - Reload the window (Ctrl+R or Cmd+R) to see changes in the renderer process (HTML/CSS/Renderer JS).
