import 'phaser';

export default class Turret extends Phaser.GameObjects.Image {
    constructor(scene, x, y, map) {
        super(scene, x, y, 'tower');

        this.scene = scene;
        this.map = map;
        this.nextTick = 0;

        // add turret to game
        this.scene.add.existing(this);
        this.setScale(-0.8);
    }

    update(time, delta) {
        // time to shoot
        if(time > this.nextTick){
            this.fire();
            this.nextTick = time + 1000;
        }

    }

    fire() {
        // get the distance if near enough fire
        var enemy = this.scene.getEnemy(this.x, this.y, 100);
        if(enemy) {
           // get angle between turret and enemy
           var angle =  Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
           this.scene.addBullet(this.x, this.y, angle);
           this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;

        }
    }

    place(i, j) {
        this.y = i * 64 + 32;
        this.x = j * 64 + 32;
        this.map[i][j] = 1;
    }

    fire() {

    }
}