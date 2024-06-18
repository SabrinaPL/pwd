# Flipping Tile Component

The Flipping Tile Component is a custom web component that represents a tile which can be flipped to reveal a front and back image. This component is ideal for memory games or other interactive applications.

## Author

Sabrina Prichard-Lybeck  
Email: <sp223kz@student.lnu.se>

## Version

1.1.0

## Features

- Flips to reveal a front and back side.
- Dynamic setting of front and back images through attributes.
- Smooth flip animations.
- Disabled state to prevent further interactions.
- Hidden state for matched tiles.
- Hover effect to indicate the selected tile.

## Usage

### Installation

Include the component in your project:

```html
<script type="module" src="path/to/flipping-tile.js"></script>
```

### HTML

```html
<flipping-tile image-front="path/to/front-image.jpg" image-back="path/to/back-image.jpg"></flipping-tile>
```

### JavaScript

```html
customElements.define('flipping-tile', class extends HTMLElement {
  // The class implementation goes here.
})
```

### Attributes

*image-front: URL of the image to display on the front of the tile.
*image-back: URL of the image to display on the back of the tile.

### Methods

*flipBack(): Flips the tile back to its original state.
*disable(): Disables the tile to prevent user interaction.
*enable(): Enables the tile to allow user interaction.
*hide(): Hides the tile, typically used when a match is found.

### Styles

Customize the appearance of the flipping tile component by modifying the embedded styles within the template.

### Events

*tile-is-flipped: Dispatched when a tile is flipped. Contains the flipped tile element in the detail property.

### License

This project is licensed under the MIT License.
