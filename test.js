class RandomID {
  constructor() {
    this.id = "";
    this.char =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    this.charLength = this.char.length;
    for (let i = 0; i < 6; i++) {
      this.id += this.char.charAt(Math.floor(Math.random() * this.charLength));
    }
  }
}

const rid = new RandomID();
console.log(rid.id);
