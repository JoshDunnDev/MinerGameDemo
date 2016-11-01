/* ----- Creates Canvas & Adds Additional Files To Game State ----- */
var game = new Phaser.Game(640, 640, Phaser.AUTO, 'game')

game.state.add('Boot', Game.Boot);
game.state.add('Preloader', Game.Preloader);
game.state.add('MainMenu', Game.MainMenu);
game.state.add('Level', Game.Level);
game.state.start('Boot');