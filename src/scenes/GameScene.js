import 'phaser';
import map from '../config/map';
import Enemy from '../objects/Enemy';
import Turret from '../objects/Turret';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    // copy map array into this.map
    this.map = map.map((arr) => {
      return arr.slice();
    });
    
    this.nextEnemy = 0;
  }

  create() {
    this.createMap();
    this.createPath();
    this.createCursor();
    this.createGroups();
  }

  createGroups() {
    // enemies, bullets, etc.
    // runChildUpdate property of a group means
    // for every call to update of scene call
    // update method of the class if it exists
    this.enemies = this.physics.add.group({
      classType: Enemy,
      runChildUpdate: true
    })
  }

  createCursor() {
    this.cursor = this.add.image(32, 32, 'cursor');
    this.cursor.setScale(2);
    this.cursor.alpha = 0;

    this.input.on('pointermove', (pointer) => {
      var i = Math.floor(pointer.y / 64);
      var j = Math.floor(pointer.x / 64);
      // gives us the index to use on our array
      
      // is the position available
      if(this.canPlaceTurret(i, j)) {
        // update cursor
        // add 32 to center it so cursor is around the full cell
        this.cursor.setPosition(j * 64 + 32, i * 64 + 32);
        this.cursor.alpha = 0.8;
      } else {
        this.cursor.alpha = 0;
      }

    });
  }

  canPlaceTurret(i, j) {
    return this.map[i][j] === 0;
  }

  createPath() {
    this.graphics = this.add.graphics();
    // path enemies follow
    this.path = this.add.path(96, -32);
    this.path.lineTo(96, 164);
    this.path.lineTo(480, 164);
    this.path.lineTo(480, 544);
    // for visualizing the path - won't appear in game
    this.graphics.lineStyle(3, 0xffffff, 1);
    this.path.draw(this.graphics);
  }

  createMap() {
    // create map
    this.bgMap = this.make.tilemap({
      key: 'level1'
    });
    // add tileset image
    this.tiles = this.bgMap.addTilesetImage('terrainTiles_default');
    // create background layer
    this.backgroundLayer = this.bgMap.createStaticLayer('Background', this.tiles, 0, 0);
    // add tower
    this.add.image(480, 480, 'base');
  }

  getEnemy(){

  }

  addBullet() {

  }

  update(time, delta){
    // if time for next enemy
    if(time > this.nextEnemy) {
      console.log("time > this.nextEnemy");
      // gfd: looks for first game object not active & not visible
      // returns that or null
      var enemy = this.enemies.getFirstDead();
      if(!enemy){ // if enemy not exist
        enemy = new Enemy(this, 0, 0, this.path);
        this.enemies.add(enemy);
      }

      if(enemy) {
        enemy.setActive(true);
        enemy.setVisible(true);

        // place enemy at start path
        enemy.startOnPath();

        this.nextEnemy = time + 2000;
      }
    }
  }
}
