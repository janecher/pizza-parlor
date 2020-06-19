//Business logic

//Pizza

function Pizza (toppings, size) {
  this.toppings = toppings;
  this.size = size;
}

Pizza.prototype.cost = function () {
  this.price = 0;
  switch (this.size) {
    case ("small"):
      this.price += 10;
      break;
    case ("medium"):
        this.price += 15;
        break;
    case ("large"):
      this.price += 20;
      break;
  }
  if (this.toppings.length > 3 && this.toppings.length < 7 && this.size !== "large") {
    price += 6;
  } else if (this.toppings.length >= 7 && this.size !== "large") {
    price += 9;
  } else {
    price += 10;
  }
  return this.price;
}



$(document).ready(function(){

});