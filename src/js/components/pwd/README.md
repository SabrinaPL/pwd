# Personal Web Desktop Component

The Personal Web Desktop (PWD) Component is a custom web component that simulates a desktop environment similar to traditional desktop operating systems. It provides a graphical user interface for launching and managing applications within a web browser.

## Author

Sabrina Prichard-Lybeck  
Email: <sp223kz@student.lnu.se>  

## Version

1.1.0

## Features

- Desktop background: Supports changing the background image by right-clicking on the desktop.
- Application launcher: Displays icons for launching various applications.
- Application management: Allows users to open, close, and move application windows within the desktop environment.
- Drag-and-drop interface: Users can click and drag application windows to move them around the desktop.

## Installation

To use the Personal Web Desktop Component, you need to include the component code in your project and define it as a custom element.

1. Copy the code for the Personal Web Desktop Component into a JavaScript file in your project.
2. Import the JavaScript file containing the component code into your HTML file.
3. Use the `<personal-web-desktop>` tag in your HTML to create a new desktop component.

## Usage

### Basic Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Personal Web Desktop Example</title>
  <script src="personal-web-desktop.js" defer></script>
</head>
<body>
  <personal-web-desktop></personal-web-desktop>
</body>
</html>
```

### Customization

You can customize the appearance and behavior of the Personal Web Desktop Component by modifying the included CSS styles and JavaScript code.

### Application Integration

To integrate applications with the desktop environment, you need to create custom application components and register them with the desktop component. Each application component should extend the app-window component and implement the necessary functionality.

### License

This project is licensed under the MIT License.
