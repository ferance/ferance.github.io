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
    this.load.image("bg","JohnAssets/background.jpeg")
  }
  create() {
    console.log("Loaded");
    this.state.start("Play")
  }
}

class Play {
  create() {
    console.log("Entered Play State");
    this.background = this.add.tileSprite(0,0,320,568,"bg");
  }
}

var game = new Phaser.Game(320,568);
game.state.add("Boot",Boot);
game.state.add("Load",Load);
game.state.add("Play",Play);
game.state.start("Boot");
