var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "sqluser",
    password: "root",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    console.log("");
});

//query the products table, display ids, products, prices, departments, etc.
connection.query("SELECT * FROM products", function(err, res) {

    console.log('█║▌│ █│║▌ ║││█║▌ │║║█║ │║║█║ Welcome to BAMazon! █║▌│ █│║▌ ║││█║▌ │║║█║ │║║█║')
    console.log("");
    console.log("All Available Products:");
    console.log("");

    for (var i = 0; i < res.length; i++) {
        console.log("ID: " + res[i].item_id + " | " + 
        "Product: " + res[i].product_name + " | " + 
        "Department: " + res[i].department_name + " | " + 
        "Price: " + res[i].price + " | " + 
        "QTY: " + res[i].stock_quantity);
        console.log('--------------------------------------------------------------------------------------------------')
    }
    console.log("");
    start();
});


//call the inquirer to ask them what they want to buy
var start = function() {

    inquirer.prompt([{
            name: "id",
            type: "input",
            message: "Enter the Product ID of the item you would like to buy."
            ,
            validate: function(value) {
                if (isNaN(value) === false && value <= 10) {
                    return true;
                } else {
                    return false;
                }
            }
        }, {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?"
            ,
            validate: function(value) {
                if (isNaN(value)) {
                    return false;
                } else {
                    return true;
                }
            }
        }

    ]).then(function(answer) {
//query the database to see if we have it in stock
        var query = "SELECT stock_quantity, price FROM products WHERE ?"
        connection.query(query, { item_id: answer.id }, function(err, res) {

            if (res[0].stock_quantity >= answer.quantity) {

                var adjustedQuantity = res[0].stock_quantity - answer.quantity;
                var purchasePrice = (answer.quantity * res[0].price).toFixed(2);
//query the databse to update the stock to the new qty
                var query2 = " UPDATE products SET ? WHERE ?";
                connection.query(query2, [{ stock_quantity: adjustedQuantity }, { item_id: answer.id }],

                    function(err, res) {
                        if (err) throw err;
                        console.log("Thank you for your purchase. Your total is $" + purchasePrice + ".");
                        console.log("Your item(s) will be shipped to you via USPS Priority Mail.");
                        console.log("I know we don't know your payment details or address.");
                        console.log("That's a whole other level of database architecture.");
                        console.log("Thanks for shopping at Bamazon.")
                        console.log("Goodbye.");
                        process.exit();
                    });           

            } else {
                console.log("Sorry, there are only " + 
                res[0].stock_quantity + " units in stock for this product. Order a smaller amount.");
                console.log("\n-----------------------------------------\n");
                start();

            }
        })
    })
}