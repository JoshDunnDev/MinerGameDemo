Game.Preloader = function(game){
	this.preloadBar = null;
};

Game.Preloader.prototype = {
	preload: function() {
		/* ----- Preloader Is Currenly Disabled ----- */
		// this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
		// this.preloadBar.anchor.setTo(0.5, 0.5);
		// this.time.advancedTiming = true;
		// this.load.setPreloadSprite(this.preloadBar);

		/* ----- Loads All Assets ----- */
		this.load.tilemap('dirt', 'assets/MinerGameTileMap_Main.csv');
		this.load.tilemap('background', 'assets/MinerGameTileMap_Background.csv');
		this.load.tilemap('dirtbackground', 'assets/MinerGameTileMap_MainBackground.csv');
		this.load.tilemap('stone', 'assets/MinerGameTileMap_Stone.csv');
		this.load.tilemap('gold', 'assets/MinerGameTileMap_Gold.csv');
		this.load.image('tiles', 'assets/MinerTileMap.png');
		this.load.spritesheet('shop', 'assets/MinerGameShop.png', 192, 128);
		this.load.spritesheet('character', 'assets/MinerGameCharacterSmall.png', 64, 64);
		this.load.spritesheet('winscreen', 'assets/WinScreen.jpg', 640, 640);
	},

	create: function() {
		this.state.start('Level');
	}
}