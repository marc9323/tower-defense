import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  // built in method, called first - before preload
  init() {
    this.readyCount = 0;
  }

  preload() {

    this.createPreloader();

    // TODO: update delay

    // time event for logo display
    // num millis, function to call, array of args to pass, scope
    this.timedEvent = this.time.delayedCall(1000, this.ready, [], this);

    this.loadAssets();

  }

  createPreloader() {
        // use fluid positioning for asset placement
    // and sizing of game, base off main cameras width/height
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    // add logo image
    this.add.image(width / 2, height / 2 - 100, 'logo');

    // display progress bar, loading bar and box around it
    // to look like the box is filling up
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50);

    // loading text
    var loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });

    // default origin of text is upper right hand corner
    // set origin point to center to center text
    loadingText.setOrigin(.5);

    // percent text
    var percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(.5);

    // loading assets text, displays name
    // of file currently loading
    var assetText = this.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: 'asdf',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    assetText.setOrigin(.5);

    // update progress bar

    // listen for events progress and fileprogress
    this.load.on('progress', (value) => {
        // parse as int, whole numbers
        percentText.setText(parseInt(value * 100) + '%');
        // constantly clear what has been drawn to make
        // it look like p bar loading
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        // inner rectangle inside progressBox
        // draws each percentage increment up to 300 width
        progressBar.fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30);
        
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
        assetText.setText('Loading asset: ' + file.key);
    });

    // remove progress bar on complete, destroy components
    this.load.on('complete', () => {
        progressBox.destroy();
        progressBar.destroy();
        assetText.destroy();
        percentText.destroy();
        loadingText.destroy();

        this.ready();
    });
  }

  loadAssets() {
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
    
        // for testing progress bar
        // for(var i = 0; i < 500; i++) {
        //     this.load.image('logo2'+i, 'assets/logo.png');
        // }
    
        // load asset tilemap in JSON format
        this.load.tilemapTiledJSON('level1', 'assets/level/level1.json');
        // this key needs to match that used in Tiled
        this.load.spritesheet('terrainTiles_default', 'assets/level/terrainTiles_default.png', {
            frameWidth: 64,
            frameHeight: 64
        });
  }

  ready() {
      // called once after phaser has loaded all our assets
      // called again by the timedEvent which allows our logo
      // to stay on screen minimum x milliseconds
    this.readyCount++;
    if(this.readyCount == 2) {
        this.scene.start('Game');
    }
  }

}



/*
NOTES:

Loading Assets:
1.) When loading assets Phaser will emit the following events:
progress, fileprogress, and complete

2.)  When progress event fires, it also provides a number between
0 and 1 to inform you of the overall progress

3.)  The complete event fires once all of the assets have 
been loaded

*/