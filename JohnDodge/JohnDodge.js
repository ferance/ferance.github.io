var C = {
  "game": {
    "width": 320,
    "height": 568
  },
  "bg": {
    "width": 320,
    "height": 568,
    "xspeed": 0,
    "yspeed": 0,
    "file": "JohnAssets/background.jpeg"
  },
  "p": {
    "file": "JohnAssets/Duck.png",
    "width": 46,
    "height": 64,
    "frames": 2,
    "fps": 4,
    "startx": 160,
    "starty": 500,
    "speed": 5
  },
  "d" : {
    "file": "JohnAssets/Apple.png",
    "width": 64,
    "height": 64,
    "frames": 1,
    "fps": 10,
    "startx": 160,
    "starty": -32,
    "speed": 20
  }
}

//-----------------------------------------------------------------------------------

class Boot {
  preload() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }
  create() {
    this.state.start("Load")
  }
}

class Load {
  preload() {
    console.log("Loading...");
    this.load.image("bg",C.bg.file)
    this.load.spritesheet("player",C.p.file,C.p.width,C.p.height,C.p.frames);
    this.load.spritesheet("dodge",C.d.file,C.d.width,C.d.height,C.d.frames);
  }
  create() {
    console.log("Loaded");
    this.state.start("Play")
  }
}

class Play {
  create() {
    console.log("Entered Play State");

    this.bg = this.add.tileSprite(0,0,C.bg.width,C.bg.height,"bg");

    this.player = this.add.sprite(C.p.startx,C.p.starty,"player");
    this.player.anchor.set(0.5,0.5);
    this.player.smoothed = false;
    this.player.scale.set(1);
    this.player.animations.add("flap");
    this.player.animations.play("flap",C.p.fps,true);

    this.dodge = this.add.sprite(C.d.startx,C.d.starty,"dodge");
    this.dodge.anchor.set(0.5,0.5)
    this.dodge.smoothed = false;
    this.dodge.scale.set(1);
    this.dodge.animations.add("anim")
    this.dodge.animations.play("anim",C.d.fps,true);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.x -= C.p.speed;
    }
    if (this.cursors.right.isDown) {
      this.player.x += C.p.speed;
    }
    if (this.dodge.y > this.game.height) {
      this.dodge.y = C.d.starty
    }
    this.dodge.y += C.d.speed;
  }
  
  render() {
    game.debug.text("x: " + this.dodge.x + ", y: " + this.dodge.y, 4, 16);
  }
}

//-----------------------------------------------------------------------------------

function restart() {
  game.state.start("Boot");
}

var game = new Phaser.Game(C.game.width,C.game.height);
game.state.add("Boot",Boot);
game.state.add("Load",Load);
game.state.add("Play",Play);
game.state.start("Boot");
