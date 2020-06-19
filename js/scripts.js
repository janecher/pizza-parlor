//Business logic

//Pizza

function Pizza(size) {
  this.toppings = [];
  this.size = size;
}

Pizza.prototype.cost = function() {
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
    this.price += 5;
  } else if (this.toppings.length >= 7 && this.size !== "large") {
    this.price += 7;
  } else if (this.toppings.length > 3 && this.toppings.length < 7 && this.size === "large"){
    this.price += 6;
  } else if (this.toppings.length >= 7 && this.size === "large") {
    this.price += 8;
  }
  return this.price;
}

Pizza.prototype.pizzaName = function() {
  return capitalizeFirstLetter(this.size) + " pizza with " + this.toppings.length + " toppings, cost: $" + this.cost();
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//Client 

function Client() {
  this.orders = [];
  this.orderId = 0;
}

Client.prototype.assignOrderId = function() {
  this.orderId += 1;
  return this.orderId;
}

Client.prototype.addOrder = function(pizza) {
  pizza.id = this.assignOrderId();
  this.orders.push(pizza);
}

Client.prototype.totalCost = function() {
  this.total = 0;
  for(let i=0; i<this.orders.length; i++)
  {
    this.total += this.orders[i].cost();
    console.log(this.total);
  }
  if(this.address) {
    this.total += 7;
  }
  console.log(this.total);
  return this.total;
}

Client.prototype.findPizza = function(id) {
  for (let i=0; i< this.orders.length; i++) {
    if (this.orders[i]) {     
      if (this.orders[i].orderId == id) {
        return this.corders[i];
      }
    }                          
  };
  return false;
}

Client.prototype.deletePizza = function(id) {
  for (let i=0; i< this.orders.length; i++) {
    if (this.orders[i]) {     
      if (this.orders[i].orderId == id) {
        delete this.orders[i];
        return true;
      }
    }                          
  };
  return false;
}

//User interface logic
function displayOrders(client) {
  let pizzaOrder = $("ul#order");
  let htmlForOrders = "";
  client.orders.forEach(function(order) {
    htmlForOrders += "<li class=" + order.id + ">" + order.pizzaName() + "</li>";
    htmlForOrders += "<button class='deleteOrder' id=" + order.id + '><i class="fa fa-trash"></i></button>';
  });
  pizzaOrder.html(htmlForOrders);
  $(".delivery-answer").text(client.address);
  $("#total").text("$"+client.totalCost());
}

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
  //attachAddPizzaListeners(client);
  addAddress();
  $("form").submit(function(event){
    event.preventDefault();
    let pizza = new Pizza();
    $("input:checkbox[name=topping]:checked").each(function() {
      pizza.toppings.push($(this).val());
    });
    pizza.size = $("#size").val();
    client.addOrder(pizza);
    client.address = $("#address").val();
    $('input[type=checkbox]').each(function() 
    { 
      this.checked = false; 
    });
    displayOrders(client);
    $(".show-order").show();
    console.log(client);
  });
});