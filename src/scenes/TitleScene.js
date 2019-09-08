import 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }


  create() {
    this.createTitle();
    this.createPlayButton();  
  }

  createTitle() {
    // title image, center dynamically
    this.titleImage = this.add.image(0, 0, 'title');
    this.centerObject(this.titleImage, 1);
  }

  createPlayButton() {
      // play button
    this.gameButton = this.add.sprite(0, 0, 'blueButton1').setInteractive();
    this.centerObject(this.gameButton, -1);

    this.gameText = this.add.text(0, 0, 'Play', {
        fontSize: '32px',
        fill: '#ffffff'
    })

    // center gameText in button
    // allows us to center one game object inside another
    // game object
    Phaser.Display.Align.In.Center(
        this.gameText,
        this.gameButton
    );

    this.gameButton.on('pointerdown', (pointer) => {
        this.scene.start('Game');
    });

    this.gameButton.on('pointerover', (pointer) => {
        this.gameButton.setTexture('blueButton2');
    });

    this.gameButton.on('pointerout', (pointer) => {
        this.gameButton.setTexture('blueButton1');
    });
  }

  centerObject(gameObject, offset = 0) {
    // width and height from main game camera
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    gameObject.x = width / 2;
    gameObject.y = height / 2 - offset * 100;
  }
}

// includes a title image and play button