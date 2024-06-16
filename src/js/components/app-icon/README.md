# App Icon Custom Component

This is a custom HTML component that represents an app icon. The component displays an image and the name of an app, and it can be interacted with to trigger an event.

## Table of Contents

- [Features] (#features)
- [Installation] (#installation)
- [Usage] (#usage)
- [Attributes] (#attributes)
- [Events] (#events)
- [Customization] (#customization)
- [Contributing] (#contributing)
- [License] (#license)

## Features

- Custom element for displaying an app icon.
- Image and app name displayed within a styled container.
- Hover effect on the app icon.
- Click event to simulate opening an app.

## Installation

To use the `app-icon` component in your project, include the following script in your HTML file:

```html
<script src="path/to/app-icon.js"></script>
```

Or, if using ES6 modules, import the component:

```javascript
import './path/to/app-icon.js';
```

## Usage

Add the custom element to your HTML file:

```html
<app-icon name="My App" image="path/to/image.png"></app-icon>
```

## Attributes

The `app-icon` component supports the following attributes:

- `name`: The name of the app (displayed as a text below the image).
- `image`: The URL of the app icon image.

Example:

```html
<app-icon name="Calculator" image="images/calculator.png"></app-icon>
```

## Events

The component dispatches a custom event when the icon is clicked:

- `openApp`: Fired when the app icon is clicked. The event's detail includes the app name.

## Customization

You can customize the styles of the component by modifying the CSS within the `<style>` tag in the JavaScript file.

Default styles:

```css
.app-icon {
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

img {
  width: 90px;
  height: 90px;
  border-radius: 25%;
}

img:hover {
  transform: scale(1.1);
}
```