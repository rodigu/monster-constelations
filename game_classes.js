class GameNetwork{
  constructor(){
    this.network = new Network();
    this.size = 50;
  }
  buildNetwork(number_of_nodes, total_weight){
    // total_weight >= Genus
    // the closer the total weight is to Genus, the higher the difficulty
    this.n_nodes = number_of_nodes;
    this.total = total_weight;
    let loop_number = int(random(this.n_nodes/2));
    let counter;
    for (counter = 0; counter < this.n_nodes; counter++){
      this.network.addNode(counter);
      this.network.nodes[counter].color = [0, 198, 207];
      this.network.nodes[counter].x = random(this.size, width - this.size);
      this.network.nodes[counter].y = random(this.size, height - this.size);
      if (this.network.getGenus() <= this.total - loop_number && counter > 0){
        let node2 = int(random(0, this.network.nodes.length - 1));
        this.network.addEdge(counter, node2);
      }
    }
    for (counter = 0; counter < loop_number; counter++){
      let node2 = int(random(0, this.network.nodes.length));
      let node1 = int(random(0, this.network.nodes.length));
      while (node1 == node2) node1 = int(random(0, this.network.nodes.length));
      this.network.addEdge(node1, node2);
    }
    let temp_total = this.total;
    let n_negative = int(random(this.network.nodes.length - 3));
    let total_negative = 0;
    for (counter = 0; counter <= n_negative; counter++){
      let negative_weight = -int(random(temp_total));
      total_negative += negative_weight;
      this.network.nodes[counter].weight = negative_weight;
    }
    while (total_negative < this.total - this.n_nodes){
      let positive_weight = int(random(1, temp_total/2));
      this.network.nodes[int(random(n_negative + 1, this.network.nodes.length))].weight += positive_weight;
      total_negative += positive_weight;
    }
  }
  drawNetwork(mouseCommand){
    let counter;
    if (this.network.nodes.length < 1)
      return;
    for (counter = 0; counter < this.network.edges.length; counter++){
      strokeWeight(5);
      stroke(220, 50);
      let nodeA = this.network.getNode(this.network.edges[counter].nodes[0]);
      let nodeB = this.network.getNode(this.network.edges[counter].nodes[1]);
      line(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
      strokeWeight(2);
      stroke(0);
    }
    for (counter = 0; counter < this.network.nodes.length; counter++){
      fill(this.network.nodes[counter].color[0], this.network.nodes[counter].color[1], this.network.nodes[counter].color[2]);
      this.network.nodes[counter].color = [0, 198, 207];
      stroke(0);
      let counter2;
      if (this.network.nodes[counter].name.indexOf('move') > -1){
          this.network.nodes[counter].x = mouseX;
          this.network.nodes[counter].y = mouseY;
          console.log(this.network.nodes[counter].weight);
      }
      let temp_size = this.size + this.network.nodes[counter].weight*2;
      if (this.network.nodes[counter].weight < 0) temp_size = this.size + this.network.nodes[counter].weight/2;
      if ((mouseX - this.network.nodes[counter].x)**2 + (mouseY - this.network.nodes[counter].y)**2 < ((temp_size)/2)**2){
        fill(255);
        for (counter2 = 0; counter2 < this.network.nodes.length; counter2++)
          if(counter != counter2 && ((this.network.nodes[counter2].x - this.network.nodes[counter].x)**2 + (this.network.nodes[counter2].y - this.network.nodes[counter].y)**2 < (temp_size/2)**2)){
            this.network.nodes[counter2].x = random(this.size, width - this.size);
            this.network.nodes[counter2].y = random(this.size, height - this.size);
          }
        if (keyIsPressed && key == ' ')
          this.network.nodes[counter].name = 'move';
        else
          this.network.nodes[counter].name = '';
        circle(this.network.nodes[counter].x, this.network.nodes[counter].y, (temp_size));
        if (mouseCommand[0] == 1 && (mouseCommand[1] <= 1 || (mouseCommand[1]%10 == 4 && mouseCommand[1] > 10) || (mouseCommand[1]%5 == 4 && mouseCommand[1] > 90))){
          let counter2;
          let neighbours = this.network.nodeNeighbors(counter);
          for (counter2 = 0; counter2 < this.network.nodes.length; counter2++)
            if(this.network.undirectedEdge(counter, counter2) && counter != counter2){
              this.network.nodes[counter2].weight += 1;
              this.network.nodes[counter].color[0] = 50;
              this.network.nodes[counter].color[1] = 220;
              this.network.nodes[counter].color[2] = 150;
            }
          this.network.nodes[counter].weight -= neighbours.length;
        }
      }
      else{
        circle(this.network.nodes[counter].x, this.network.nodes[counter].y, (temp_size));
      }
      fill(0);
      noStroke(0);
      textSize(20);
      push();
      translate(this.network.nodes[counter].x, this.network.nodes[counter].y);
      textAlign(CENTER, CENTER);
      text(this.network.nodes[counter].weight, 0, 0);
      pop();
    }
  }
}
