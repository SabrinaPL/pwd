# Flipping Tile Custom Component

This is a custom HTML component representing a flipping tile. The component is designed to be used in memory games, allowing tiles to flip to reveal their back sides and dispatch events when flipped.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Attributes](#attributes)
- [Methods](#methods)
- [Events](#events)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Features

- Custom element for displaying a flipping tile.
- Smooth flip animation and transition effects.
- Customizable front and back content using slots.
- Dispatches events when tiles are flipped.

## Installation

To use the `flipping-tile` component in your project, include the following script in your HTML file:

```html
<script src="path/to/flipping-tile.js"></script>
```

Or, if using ES6 modules, import the component:

```javascript
import './path/to/flipping-tile.js';
```

## Usage

Add the custom element to your HTML file:

```html
<flipping-tile>
  <div slot="front">Front Content</div>
  <div slot="back">Back Content</div>
</flipping-tile>
```

## Attributes

The `flipping-tile` component does not have custom attributes. However, you can customize the content inside the tile using slots.

## Methods

The component includes the following methods:

- `#flipTile(tile)`: Flips the tile and disables it to prevent further interaction.

## Events

The component dispatches a custom event when the tile is flipped:

- `tile-is-flipped`: Fired when the tile is flipped. The event's detail includes the flipped tile element.

Example of handling the event:

```javascript
document.querySelector('flipping-tile').addEventListener('tile-is-flipped', (event) => {
  console.log('Tile flipped:', event.detail.tile);
});
```

## Customization

You can customize the styles of the component by modifying the CSS within the `<style>` tag in the JavaScript file.

Default styles:

```css
.flipping-tile {
  width: 100%;
  height: 100%;
  margin: 1rem;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  transition: opacity 1s;
  background-color: white;
}

#wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  transform-style: preserve-3d;
}

::part(front-of-tile),
::part(back-of-tile) {
  height: 100%;
  width: 100%;
  position: absolute;
  backface-visibility: hidden;
  border-radius: 10px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

::part(front-of-tile) {
  background-color: #f5e9ee;
  background-image: url('../../images/kanji6.png');
  transform: rotateY(180deg);
}

::part(back-of-tile) {
  background-color: red;
  background-image: url('../../images/back-of-card.png');
}

.flipping-tile.is-flipped #wrapper {
  transform: rotateY(180deg);
  transition: transform 1s;
}

.flipping-tile:hover {
  opacity: 0.6;
}

.flipping-tile.is-disabled {
  pointer-events: none;
}

.flipping-tile.is-hidden {
  opacity: 0;
  transition: opacity 4s;
}
```
