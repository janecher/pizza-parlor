//Business logic

//Pizza

function Pizza (size) {
  this.toppings = [];
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

//Client 

function Client (address) {
  this.orders = [];
  this.address = address;
}

Client.prototype.totalCost = function () {
  this.total = 0;
  this.orders.forEach(function(element) {
    this.total += element.price;
  });
  if(this.address != "pick up") {
    this.total += 7;
  }
  return this.total;
}

//User interface logic

function attachAddPizzaListeners(client) {

}

function addAddress() {
  $("#delivery").on("change", function () {
    if($("#delivery").val() === "pick-up") {
      $(".address").hide();
      return false;
    } else if ($("#delivery").val() === "delivery"){
      $(".address").show();
      return true;
    }
  });
}
 

$(document).ready(function(){
  let client = new Client();
  attachAddPizzaListeners(client);
  addAddress();
  $("form").submit(function(event){
    event.preventDefault();
    let pizza = new Pizza();
    $("input:checkbox[name=topping]:checked").each(function() {
      pizza.toppings.push($(this).val());
    });
    pizza.size = $("#size").val();
    client.orders.push(pizza);
    client.address = $("#address").val();
    $('input[type=checkbox]').each(function() 
    { 
      this.checked = false; 
    });
    console.log(client);
  });
});