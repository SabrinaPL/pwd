# High Score Web Component

The High Score Web Component is a custom element that displays and manages high scores for the quiz. It allows users to view the top 5 fastest players and provides a "Play again" button.

## Public Methods

`saveHighScore(player: object): void`
Saves the player's score in the high score list that is stored in the local web storage.

Parameters: `player` (object): An object containing player information (`nickname` and `score`).

`showHighScore(): void`
Displays the top 5 fastest players in the high score list (from the local web storage).

## Events

`playAgain`
Is triggered when the user clicks the "play again"-button.

## Styling

The High Score Web Component includes default styling for displaying high scores and the "Play again" button.
