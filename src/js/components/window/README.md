# Window Component

The Window Component is a custom web component that represents a draggable window with a header and content area.

## Author

Sabrina Prichard-Lybeck  
Email: <sp223kz@student.lnu.se>  

## Version

1.1.0

## Features

- Draggable window: Users can click and drag the window by its header to move it around the screen.
- Close button: Provides a button to close the window.
- Customizable content: Allows developers to insert custom content into the window's body.

## Installation

To use the Window Component, you need to include the component code in your project and define it as a custom element.

1. Copy the code for the Window Component into a JavaScript file in your project.
2. Import the JavaScript file containing the Window Component code into your HTML file.
3. Use the `<app-window>` tag in your HTML to create a new window component.

## Usage

### Basic Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Window Component Example</title>
  <script src="window-component.js" defer></script>
</head>
<body>
  <app-window id="my-window">
    <h3 slot="app-title">My Window</h3>
    <!-- Your custom content goes here -->
  </app-window>
</body>
</html>
```

### Customizing Styles

You can customize the appearance of the window component by modifying the included CSS styles.

### Events

The Window Component emits the following events:

*close-app: Dispatched when the close button is clicked.
*move-window: Dispatched when the window is moved.
*focus-app: Dispatched when the window is focused.

### Methods

*focusWindow(): Focuses the window.

### License

This project is licensed under the MIT License.
