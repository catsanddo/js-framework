# JS Boilerplate
### For making simple games
This is a template for making games using vanilla Javascript.
It was originally made with the intention of creating a game for the [Nokia 3310 Jam](https://itch.io/jam/nokiajam3).

It has a few fundamental capabilities:
- An entity class with rectangular collision detection
- A clock with delta time and timers built in
- A rudimentary audio player function
- Canvas scaling for pixel art games

One thing to note is that the size of the canvas is initially set in the `<canvas>` tag in `index.html`.
The `width` and `height`  variables in `game.js` are used for games that use the scale function.
They refer to the width and height of the canvas in "game pixels" rather than real ones.
