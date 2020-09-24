class Control{
    constructor(){
      this.mouse = [0, 0];
      this.keyboard = [0, 0];
    }
    mouseController(){
      if (mouseIsPressed){
        this.mouse[0] = 1;
        this.mouse[1]++;
      }
      else{
        this.mouse[0] = 0;
        this.mouse[1] = 0;
      }
    }
}
