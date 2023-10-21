import PixelPath from "./framework/PixelPath.js";


class GameScene extends PixelPath.Scene 
{
    key = 'gamescene';

    preload()
    {
        this.load.image('./assets/lands.png', 'lands');
        this.load.image('./assets/tree.png', 'tree');
        this.load.image('./assets/slime.png', 'slime');
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
        })

        this.camera.transform.position.setTo(160, -22, 50);
        this.camera.transform.rotation.setTo(1.2, 0, 0);
        this.camera.fovDeg = 90;

        this.plane = this.add.image(0, 0, 0, 'lands');

        for (let i = 0; i < 30; i++)
        {
            let tree = this.add.image(Math.random() * 300 + 50, Math.random() * 300 + 50, 0, 'tree');
            tree.transform.rotation.x = 45;
        }

        this.slime = this.add.sprite(150, 50, 0, 'slime', 'slime_idle_anims');
        this.slimeShadow = this.add.sprite(150, 50, 0, 'slime', 'slime_idle_anims');
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
            translation.z += speed;
        } else if (input.isKeyDown(PixelPath.Input.Keys.LeftShift))
        {
            translation.z -= speed;
        }

        this.slime.transform.position = this.slime.transform.position.add(translation);
        this.slimeShadow.transform.position.copyFrom(this.slime.transform.position)
    }

    randomInt(min, max)
    {
        let diff = max - min;
        return Math.round(Math.random() * diff + min);
    }
}


class HUDScene extends PixelPath.Scene 
{
    key = 'hud';

    create()
    {
        this.camera.transform.position.z = 100;
        this.rect = this.add.image(0.0, 0.0, 0.0, 'lite');
        console.log(this);
    }
}


new PixelPath.Game({
    width: 300,
    height: 300,
    clearColor: 0xffffff,
    scenes: [GameScene, HUDScene]
})