var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "Bamazon"
});


function validation(value) {
	var randomnumber = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (randomnumber && (sign === 1)) {
		return true;
	} else {
		return "Please enter an actual number";
	}
}

function purchasePrompt() {

	// Prompt the user to
	inquirer.prompt([
		{
			type: "input",
			name: "item_id",
			message: "What item would you like to buy? Please enter item_id",
			validate: validation,
			filter: Number
		},
		{
			type: "input",
			name: "quantity",
			message: "Quantity?",
			validate: validateInput,
			filter: Number
		}
	]).then(function(input) {
	
		var item = input.item_id;
		var quantity = input.quantity;

		var querypull = "SELECT * FROM products WHERE ?";

		connection.query(querypull, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log("Please select a valid Item ID.");
				displayInventory();

			} else {
				var queryData = data[0];

				if (quantity <= queryData.stock_quantity) {
					console.log("Item is in stock. Adding to order");

					var updateQueryStr = "UPDATE products SET stock_quantity = " + (queryData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log("Order Placed. Total: $" + queryData.price * quantity);
						console.log("-----------------------------------------\n");

						connection.end();
					})
				} else {
					console.log("Sorry, there is not enough of the item in stock. Please modify your order");
					console.log("\n-----------------------------------------\n");

					displayInventory();
				}
			}
		})
	})
}


function displayInventory() {

	//database query string
	querypull = "SELECT * FROM products";

	// Make the database query
	connection.query(querypull, function(err, data) {
		if (err) throw err;

		console.log("Current Inventory: ");
		console.log("-----------------------------------------\n");

		var outputline = "";
		for (var i = 0; i < data.length; i++) {
			outputline = "";
			outputline += "Item ID: " + data[i].item_id + '  //  ';
			outputline += "Product Name: " + data[i].product_name + '  //  ';
			outputline += "Department: " + data[i].department_name + '  //  ';
			outputline += "Price: $" + data[i].price + "\n";

			console.log(outputline);
		}

	  	console.log("-----------------------------------------\n");

	  	purchasePrompt();
	})
}

function runBamazon() {

	displayInventory();
}

//run main code
runBamazon();