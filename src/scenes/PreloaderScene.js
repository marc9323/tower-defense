import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
      // load asset images
    this.load.image('logo', 'assets/logo.png');
    this.load.image('bullet', 'assets/level/bulletDark2_outline.png');
    this.load.image('tower', 'assets/level/tank_bigRed.png');
    this.load.image('enemy', 'assets/level/tank_sand.png');
    this.load.image('base', 'assets/level/tankBody_darkLarge_outline.png');
    this.load.image('title', 'assets/ui/title.png');
    this.load.image('cursor', 'assets/ui/cursor.png');
    this.load.image('blueButton1', 'assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'assets/ui/blue_button03.png');

    // placeholder 
    this.load.image('logo2', 'assets/logo.png');

    // load asset tilemap in JSON format
    this.load.tilemapTiledJSON('level1', 'assets/level/level1.json');
    // this key needs to match that used in Tiled
    this.load.spritesheet('terrainTiles_default', 'assets/level/terrainTiles_default.png', {
        frameWidth: 64,
        frameHeight: 64
    });




    
  }

  create() {
    this.scene.start('Game');
  }
}