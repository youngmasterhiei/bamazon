var mysql = require("mysql");
var inquirer = require('inquirer');
var table = require("console.table");



var itemId = "";
var itemQuantity = "";
var itemPrice = "";
var itemName = "";
var totalPrice = 0;

var purchaseQuantity = "";


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "target1",
    database: "bamazon",
    insecureAuth: true
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    productList(function () {
        promptQuestions();

    });
});








function productList(callback) {
    connection.query("SELECT * FROM products", function (err, res1) {
        if (err) throw err;
        console.log(res1);

        callback();
    });

};


function promptQuestions() {
    inquirer.prompt(question).then(processAnswers);


};

function promptContinue(){
    inquirer.prompt(exitQuestion).then(processContinue);

}



function chooseProduct() {

    connection.query("SELECT * FROM products WHERE item_id ='" + itemId + "'", function (err, res) {
        if (err) throw err;
        if (purchaseQuantity > res[0].stock_quantity) {
            console.log("There is not enough in stock to fulfil the order. sorry.\n ");
            console.log("we have " + res[0].stock_quantity + " left in stock");

            inquirer.prompt(question).then(processAnswers);

        }
        else {
            console.log(res);

            itemPrice = res[0].price;
            itemName = res[0].product_name;
            itemQuantity = res[0].stock_quantity - purchaseQuantity;
            console.log(itemQuantity);
            purchaseItems();
        }



    });

};

function purchaseItems() {
    console.log("Updating quantities \n");
    var query = connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: itemQuantity
            },
            {
                item_id: itemId
            }
        ],
        function (err, res) {
            // console.log("\n" + res.affectedRows + " products updated!\n");
        }
    );

    console.log(query.sql);
    var subtotal = itemPrice * purchaseQuantity;
    totalPrice += subtotal;
    console.log("you have purchased: " + purchaseQuantity + " units of " + itemName + " for : $" + itemPrice + "/unit.\n");
    console.log("the total price for " + itemName + " is: $" + subtotal+"\n");
    console.log("shopping cart total is: $" + totalPrice);
    promptContinue();
};




function processAnswers(answers) {
    console.log("you chose:", answers);
    itemId = answers.id;
    purchaseQuantity = answers.units;
    console.log(itemId);
    // answers = 
    chooseProduct();
};

function processContinue(answers) {
    console.log("you chose:", answers);
    continueShopping = answers.response;
    productList(function () {
        promptQuestions();

    });
};

var question = [
    {
        message: "Which product would you like to buy?",
        type: "input",
        name: "id",
        validate: function (userInput) {
            if (userInput == "" || isNaN(userInput) || userInput < 1 || userInput > 17) {
                console.log("You have entered a invalid item id.\n");
                return false;
            }
            else {
                return true;
            }

        }

    }, {
        message: "how many units would you like to buy?",
        type: "input",
        name: "units", validate: function (userInput) {
            if (userInput == "" || isNaN(userInput)) {
                console.log("You have entered a invalid unit count.\n");
                return false;
            }

            else {
                return true;
            }
        }
    }];


var exitQuestion = [
    {
        message: "\ncontinue shopping? Enter Y or N\n",
        type: "input",
        name: "response", validate: function (userInput) {
            if (userInput.toLowerCase() === "y") {
               
                return true;
            }

            else if (userInput.toLowerCase() === "n") {
                console.log("\nyour total is: $" + totalPrice);
                console.log("\nHave a great day");
                process.exit(0);

            }
        }
    }];





