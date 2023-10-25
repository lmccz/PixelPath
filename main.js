import PixelPath from "./framework/PixelPath.js";


class GameScene extends PixelPath.Scene 
{
    preload()
    {
        this.load.image('./assets/lands.png', 'lands');
        this.load.image('./assets/tree.png', 'tree');
        this.load.image('./assets/slime.png', 'slime');
        this.load.image('./assets/tips.png', 'tips');
        this.load.image('./assets/hud.png', 'hud');
        this.load.image('./assets/square.png', 'square');

        this.events.on('load-progress', data => { console.log(data) });
    }

    create()
    {
        this.anims.create({
            key: 'slime_idle_anims',
            texture: 'slime',
            cols: 4,
            rows: 1,
            repeat: -1,
            frameRate: 160
        });

        const angle = PixelPath.Math.Angle.DegToRad(60);

        this.camera.transform.position.setTo(150, 50, 100);
        this.camera.transform.rotation.setTo(1.2, 0, 0);

        this.plane = this.add.image(0, 0, 0, 'lands');

        for (let i = 0; i < 200; i++)
        {
            const tree = this.add.image(Math.random() * 300 + 50, Math.random() * 300 + 50, 0, 'tree');
            const scale = Math.random();
            tree.transform.rotation.x = angle;
            tree.transform.scale.setTo(0.3 + scale, 0.3 + scale, 0.3 + scale);
        }

        this.slime = this.add.sprite(150, 50, 0, 'slime_idle_anims');
        this.slimeShadow = this.add.sprite(150, 50, 0, 'slime_idle_anims');
        this.slime.transform.rotation.x = 45;
        this.slimeShadow.transform.rotation.x = 179;
        this.slimeShadow.tint.setTo(0, 0, 0, 100)

        this.camera.startFollow({
            target: this.slime,
            lerpX: 0.06,
            lerpY: 0.06,
            lerpZ: 0.06,
            offsetX: 0,
            offsetY: 68,
            offsetZ: -50
        })

        this.renderer.ambientLight.setTo(80, 80, 80, 255)
        this.light1 = this.add.light(0, 0, 0)
        this.light1.parent = this.slime;
        this.light1.color.setTo(255, 255, 255, 255 * 60);

        this.tips = this.add.image(120, 50, 600, 'tips');
        this.tips.transform.rotation.x = angle;
        this.tips.transform.scale.setTo(.4, .4, .4);
        this.light2 = this.add.light(0, 0, 0)
        this.light2.parent = this.tips;
        this.light2.color.setTo(255, 255, 255, 255 * 30);

        const tipsBody = this.physics.enable(this.tips);
        const slimeBody = this.physics.enable(this.slime);

        this.physics.addCollide(tipsBody, slimeBody, (t) =>
        {
            tipsBody.parent.tint.setTo(Math.random() * 255, Math.random() * 255, Math.random() * 255, 255);
        })

        this.staticImg = this.add.image(0, 20, -100, 'hud');
        this.staticImg.transform.rotation.y = 0.03
        this.staticImg.transform.scale.setTo(0.4, 0.4, 0.4)
        this.staticImg.parent = this.camera;
        this.light3 = this.add.light(20, 10, 0)
        this.light3.parent = this.staticImg;
        this.light3.color.setTo(255, 255, 255, 255 * 40);

        // this.tweens.add({
        //     target: this.staticImg.transform.rotation,
        //     duration: 600,
        //     repeat: -1,
        //     yoyo: false,
        //     props: [
        //         { key: 'y', from: 0.03, to: 0.06 },
        //     ]
        // })

        this.tweens.add({
            target: this.staticImg.transform.position,
            duration: 1000,
            repeat: 0,
            yoyo: false,
            props: [
                { key: 'x', from: 0, to: -56 },
            ]
        })

        this.particles = this.add.particles({
            position: new PixelPath.Math.Vector3(150, 50, 0),
            alpha: { start: 0.4, end: 0 },
            scale: { start: 4, end: 8 },
            speedX: { min: -1, max: 1 },
            speedY: { min: 1, max: 2 },
            speedZ: { min: 1, max: 2 },
            rotate: { start: 0, end: 180 / Math.PI / 18 },
            lifespan: 1600,
            quantity: 30,
            texture: 'square'
        })

        console.log(this);
    }



    update(t, d)
    {
        let input = this.input;
        let speed = d * 0.1;
        let translation = new PixelPath.Math.Vector3(0, 0, 0);

        if (input.isKeyDown(PixelPath.Input.Keys.A))
        {
            translation.x -= speed;
        } else if (input.isKeyDown(PixelPath.Input.Keys.D))
        {
            translation.x += speed;
        }

        if (input.isKeyDown(PixelPath.Input.Keys.W))
        {
            translation.y += speed;
        } else if (input.isKeyDown(PixelPath.Input.Keys.S))
        {
            translation.y -= speed;
        }

        if (input.isKeyDown(PixelPath.Input.Keys.Space))
        {
            translation.z += speed * 6;
        } else if (input.isKeyDown(PixelPath.Input.Keys.LeftShift))
        {
            this.camera.startShake(320, 0.004)
            translation.z -= speed;
        }

        this.slime.transform.position = this.slime.transform.position.add(translation);
        this.slimeShadow.transform.position.copyFrom(this.slime.transform.position);
        this.particles.emitParticleAt(this.slime.x, this.slime.y, this.slime.z)
    }

    randomInt(min, max)
    {
        let diff = max - min;
        return Math.round(Math.random() * diff + min);
    }
}


new PixelPath.Game({
    width: 300,
    height: 300,
    clearColor: 0x000000,
    plugins: [],
    scene: GameScene
})