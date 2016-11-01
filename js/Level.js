Game.Level = function(game) {

};

/* ----- Reference Variables ----- */
var tile;
var layer;

/* ----- Tileset Variables ----- */
var dirt;
var dirtBackground;
var background;
var stone;
var gold;
var dirtLayer;
var dirtBackgroundLayer;
var backgroundLayer;
var stoneLayer;
var goldLayer;

/* ----- Sprite Variables ----- */
var shop;
var character;
var controls = {};
var characterSpeed = 196;

/* ----- Display Variables ----- */
var goldCount = 0;
var goldCountText;
var winText;
var winSreen

Game.Level.prototype = {
	create: function() {
		/* ----- Adds Gravity ----- */
		this.physics.arcade.gravity.y = 1400;

		/* ----- Add Tilesets For All Layers ----- */
		dirtBackground = this.add.tilemap('dirtbackground', 64, 64);
		dirtBackground.addTilesetImage('tiles');
		dirt = this.add.tilemap('dirt', 64, 64);
		dirt.addTilesetImage('tiles');
		background = this.add.tilemap('background', 64, 64);
		background.addTilesetImage('tiles');
		stone = this.add.tilemap('stone', 64, 64);
		stone.addTilesetImage('tiles');
		gold = this.add.tilemap('gold', 64, 64);
		gold.addTilesetImage('tiles');

		/* ----- Creates Layers For All Tilesets ----- */
		dirtBackgroundLayer = dirtBackground.createLayer(0);
		dirtLayer = dirt.createLayer(0);
		backgroundLayer = background.createLayer(0);
		stoneLayer = stone.createLayer(0);
		goldLayer = gold.createLayer(0);

		/* ----- Resizes World ----- */
		dirtBackgroundLayer.resizeWorld();
		dirtLayer.resizeWorld();
		backgroundLayer.resizeWorld();

		/* ----- Sets Collision For Tilesets ----- */
		dirt.setCollisionBetween(60, 61);
		gold.setCollision(62);
		stone.setCollision(63);

		/* ----- Add Sprites ----- */
		shop = this.add.sprite(320, 128, 'shop')
		character = this.add.sprite(96, 224, 'character');
		character.anchor.setTo(0.5, 0.5);
		character.scale.setTo(.9);

		/* ----- Adds Animations ----- */
		character.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 4, true);

		/* ----- Enables Character To Have Physics ----- */
		this.physics.arcade.enable(character);
		character.body.collideWorldBounds = true;

		/* ----- Makes Camera Follow Character ----- */
		this.camera.follow(character);

		/* ----- Adds Keyboard Controls ----- */
		controls = {
			right: this.input.keyboard.addKey(Phaser.Keyboard.D),
			left: this.input.keyboard.addKey(Phaser.Keyboard.A),
			up: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
			down: this.input.keyboard.addKey(Phaser.Keyboard.S),
		};

		/* ----- Add Gold Count Display ----- */
		goldCountText = game.add.text(16, 16, 'Gold: 0', { fontSize: '32px', fill: '#fff' });
		goldCountText.fixedToCamera = true;

	},

	update: function() {
		/* ----- Enables Collision Between Character & Dirt Tiles ----- */
		this.physics.arcade.collide(character, dirtLayer, function(character, block){
			tile = dirt;
			layer = dirtLayer;

			/* ----- Allow Character To Dig Dirt If Dirt Tile Is Available ----- */
			if(controls.down.isDown) {
				if(tile.hasTile(layer.getTileX(character.x), layer.getTileY(character.y) + 1)) {
					this.digDown(block);
				}
			}

			if(controls.up.isDown) {
				if(tile.hasTile(layer.getTileX(character.x), layer.getTileY(character.y) -1)) {
					this.digUp(block);
				}
			}

			if(controls.right.isDown) {
				if(tile.hasTile(layer.getTileX(character.x) + 1, layer.getTileY(character.y))) {
					this.digRight(block);
				}
			}

			if(controls.left.isDown) {
				if(tile.hasTile(layer.getTileX(character.x) - 1, layer.getTileY(character.y))) {
					this.digLeft(block);
				}
			}

		}, null, this);

		/* ----- Enables Collision Between Character & Gold Tiles ----- */
		this.physics.arcade.collide(character, goldLayer, function(character, block){
			tile = gold;
			layer = goldLayer;

			/* ----- Allow Character To Dig Gold If Gold Tile Is Available ----- */
			if(controls.down.isDown) {
				if(tile.hasTile(layer.getTileX(character.x), layer.getTileY(character.y) + 1)) {
					this.digDown(block);
					/* ----- Updates Gold Display With Current Amount ----- */
					goldCount++;
					goldCountText.text = 'Gold: ' + goldCount;
				}
			}

			if(controls.up.isDown) {
				if(tile.hasTile(layer.getTileX(character.x), layer.getTileY(character.y) -1)) {
					this.digUp(block);
					/* ----- Updates Gold Display With Current Amount ----- */
					goldCount++;
					goldCountText.text = 'Gold: ' + goldCount;
				}
			}

			if(controls.right.isDown) {
				if(tile.hasTile(layer.getTileX(character.x) + 1, layer.getTileY(character.y))) {
					this.digRight(block);
					/* ----- Updates Gold Display With Current Amount ----- */
					goldCount++;
					goldCountText.text = 'Gold: ' + goldCount;
				}
			}

			if(controls.left.isDown) {
				if(tile.hasTile(layer.getTileX(character.x) - 1, layer.getTileY(character.y))) {
					this.digLeft(block);
					/* ----- Updates Gold Display With Current Amount ----- */
					goldCount++;
					goldCountText.text = 'Gold: ' + goldCount;
				}
			}

		}, null, this);
		
		/* ----- Enables Collision Between Character & Stone Tiles ----- */
		this.physics.arcade.collide(character, stoneLayer);

		/* ----- Sets Character Movement To 0 & Runs Idle Animation ----- */
		character.body.velocity.x = 0;
		character.animations.play('idle');

		/* ----- Controls Character Speed ----- */
		if(controls.right.isDown) {
			character.body.velocity.x += characterSpeed;
		} 

		if(controls.left.isDown) {
			character.body.velocity.x -= characterSpeed;	
		}

		if(controls.up.isDown) {
			character.body.velocity.y = -196;
		}

		/* ----- Checks Overlap Of Chracter & Shop----- */
		if(this.checkOverlap(character, shop)) {
			if(goldCount === 14) {
				/* ----- Displays Win Screen If Gold Is 14 & Character At Shop ----- */
				winScreen = game.add.sprite(320, 320, 'winscreen')
				winScreen.anchor.setTo(0.5, 0.5);
				winText = game.add.text(320, 320, 'You Win!', { fontSize: '32px', fill: '#fff' });
				winText.anchor.setTo(0.5, 0.5);
			}
		}


	},

	/* ----- Removes Tiles When Dug By Character----- */
	digDown: function(block) {
		tile.removeTile(layer.getTileX(character.x), layer.getTileY(character.y) + 1)
	},
	digUp: function(block) {
		tile.removeTile(layer.getTileX(character.x), layer.getTileY(character.y) - 1)
	},
	digRight: function(block) {
		tile.removeTile(layer.getTileX(character.x) + 1, layer.getTileY(character.y))
	},
	digLeft: function(block) {
		tile.removeTile(layer.getTileX(character.x) - 1, layer.getTileY(character.y))
	},

	/* ----- Checks Overlap Of Chracter & Shop----- */
	checkOverlap: function(spriteA, spriteB) {
		var boundsA = spriteA.getBounds();
		var boundsB = spriteB.getBounds();
		return Phaser.Rectangle.intersects(boundsA, boundsB);
	}

}