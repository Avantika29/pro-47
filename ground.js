class Ground{
constructor(x,y,w,h){
    this.body = Bodies.rectangle(x,y,w,h,{isStatic:true})
   World.add(wld,this.body);
   this.width = w;
   this.height = h;
   this.image = loadImage("images/ground.png")
}

display(){
    imageMode(CENTER)
    image(this.image,this.body.position.x, this.body.position.y, this.width, this.height)
}

}