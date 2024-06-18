# High Score Web Component

The High Score Web Component is a custom element that displays and manages high scores for the quiz. It allows users to view the top 5 fastest players and provides a "Play again" button.

## Author

Sabrina Prichard-Lybeck  
Email: <sp223kz@student.lnu.se>  

## Version

1.1.0

## Public Methods

`saveHighScore(player: object): void`
Saves the player's score in the high score list that is stored in the local web storage.

Parameters: `player` (object): An object containing player information (`nickname`, `score` and `difficulty`).

`showHighScore(): void`
Displays the top 5 player scores from the high score list (from the local web storage).

## Private Method

`clearHighScore(): void`
Clears the high scores from the local storage.

## Events

`playAgain`
Is triggered when the user clicks the "play again"-button.

## Styling

The High Score Web Component includes default styling for displaying high scores and the "Play again" button.
