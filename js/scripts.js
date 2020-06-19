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
    if(this.orders[i]) {
      this.total += this.orders[i].cost();
    }
  }
  return this.total;
}

Client.prototype.findPizza = function(id) {
  for (let i=0; i< this.orders.length; i++) {
    if (this.orders[i]) {     
      if (this.orders[i].id == id) {
        return this.orders[i];
      }
    }                          
  }
  return false;
}

Client.prototype.deletePizza = function(id) {
  for (let i=0; i< this.orders.length; i++) {
    if (this.orders[i]) {     
      if (this.orders[i].id == id) {
        delete this.orders[i];
        return true;
      }
    }                          
  }
  return false;
}

//User interface logic

function displayOrders(client) {
  let pizzaOrder = $("ul#order");
  let totalCost = client.totalCost();
  if(client.totalCost() === 0) {
    pizzaOrder.html("");
    $(".extra-info").hide();
    return;
  }
  let htmlForOrders = "";
  client.orders.forEach(function(order) {
    htmlForOrders += "<li class=" + order.id + ">" + order.pizzaName() + " ";
    htmlForOrders += "<button class='removeButton btn' id=" + order.id + '><i class="fa fa-close"></i></button></li>';
  });
  pizzaOrder.html(htmlForOrders);
  if(client.address !== "Pick-up") {
    totalCost += 7;
  }
  $(".delivery-answer").text(client.address);
  $("#total").text("$" + totalCost);
  $(".extra-info").show();
}

function attachOrderInfoListeners(client) {
  $("ul#order").on("click", "li", function() {
    $("div#pizza-info").html(showPizzaInfo(this.className, client));
  });
  $("ul#order").on("click", "div#pizza-info", function() {
    $(this).hide();
  });
  $("ul#order").on("click", ".removeButton", function() {
    client.deletePizza(this.id);
    displayOrders(client);
  });
}

function addAddress() {
  $("#delivery").on("change", function () {
    if($("#delivery").val() === "pick-up") {
      $(".address").hide();
    } else if ($("#delivery").val() === "delivery"){
      $(".address").show();
    }
  });
}

function showPizzaInfo(pizzaId, client) {
  const pizza = client.findPizza(pizzaId);
  let pizzaInfo = "<ul class='pizza-info'>";
  for(let i=0; i < pizza.toppings.length; i++) {
    pizzaInfo += "<li>" + capitalizeFirstLetter(pizza.toppings[i]) + "</li>";
  }
  pizzaInfo += "</ul>";
  return pizzaInfo;
}

$(document).ready(function(){
  let client = new Client();
  attachOrderInfoListeners(client);
  addAddress();
  $("form").submit(function(event){
    event.preventDefault();
    let pizza = new Pizza();
    $("input:checkbox[name=topping]:checked").each(function() {
      pizza.toppings.push($(this).val());
    });
    if(pizza.toppings.length === 0) {
      alert("Please choose at least one topping");
      return;
    }
    pizza.size = $("#size").val();
    client.addOrder(pizza);
    if($("#delivery").val() === "pick-up" ) {
      client.address = "Pick-up";
    } else if (!($("#address").val())) {
      client.address = "Pick-up (Client didn't input the address)";
    } else {
      client.address = $("#address").val();
    }
    $('input[type=checkbox]').each(function() 
    { 
      this.checked = false; 
    });
    $("#address").val("");
    displayOrders(client);
    $(".show-order").show();
  });
});