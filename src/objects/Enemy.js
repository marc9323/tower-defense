import 'phaser';
import levelConfig from '../config/levelConfig';

export default class Enemy extends Phaser.GameObjects.Image {
    constructor(scene, x, y, path) {
        super(scene, x, y, 'enemy');

        this.scene = scene;
        this.path = path;

        // additional properties
        this.hp = 0;
        this.enemySpeed = 0;
        // game object that tells us where we need to start on
        // our path, vector2 with positions we need to move
        this.follower = {
            t: 0,
            vec: new Phaser.Math.Vector2()
        };

        // t: position enemy at on path

        // add enemy to scene
        this.scene.add.existing(this);
    }

    update(time, delta) {
        // move the t point along path
        this.follower.t += this.enemySpeed * delta;

        // get the x,y position of given t point
        this.path.getPoint(this.follower.t, this.follower.vec);

        // rotate enemy
        // TODO: TWEEN this for smooth rotation
        if(this.follower.vec.y > this.y && 
            this.follower.vec.y != this.y) {
                this.angle = 0;
            }

        if(this.follower.vec.x > this.x && 
            this.follower.vec.x != this.x) {
                this.angle = -90;
            }

        // set the x and y position of enemy
        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        // if have reached end of path, remove enemy
        if(this.follower.t >= 1) {
            this.setActive(false);
            this.setVisible(false);
            // TODO: update player health
        }
    }

    startOnPath() {
        // reset health
        this.hp = levelConfig.initial.enemyHealth +
           levelConfig.incremental.enemyHealth;
        // reset speed
        this.enemySpeed = levelConfig.initial.enemySpeed *
            levelConfig.incremental.enemySpeed;

        // set t at start of the path
        this.follower.t = 0;
        // get the x,y position of given t point
        this.path.getPoint(this.follower.t, this.follower.vec);

        // set the x and y position of enemy
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
    }

    recieveDamage(damage) {
        this.hp -= damage;

        // if hp < 0 deactivate enemy
        if(this.hp <= 0) {
            this.setActive(false);
            this.setVisible(false);
            // TODO: update score
        }
    }
}