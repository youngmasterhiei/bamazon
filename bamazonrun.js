var mysql = require("mysql");
var inquirer = require('inquirer');
var itemId = "";
var itemQuantity = "";
var purchaseQuantity = "";


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "target1",
        database: "bamazon",
        insecureAuth: true
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});
//UPDATE products SET ? WHERE ?,
//[
  //{
//quantity: 100
//flavor: "rocky road"
//}
//],



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
      function(err, res) {
        console.log(res.affectedRows + " products updated!\n");
      }
    );
  
  // logs the actual query being run
  console.log(query.sql);
}


// function customerPurchase(){


// connection.query("UPDATE products SET ? WHERE ?,
// [
//     {
//         quantity: 
//     }
// ]

// };

function afterConnection(){
    connection.query("SELECT * FROM products", function(err, res1){
        if (err) throw err;
        console.log(res1);
        
    });
    // connection.query("SELECT * FROM products WHERE department_name ='beverages'", function(err, res2){
    //     if (err) throw err;
    //     console.log(res2);

    // });

};

function afterprompt(){
  // connection.query("SELECT * FROM products", function(err, res1){
  //     if (err) throw err;
  //     console.log(res1);
      
  // });
  connection.query("SELECT * FROM products WHERE item_id ='" + itemId + "'", function(err, res){
      if (err) throw err;
    console.log(res);
      console.log(res[0].product_name);
      itemQuantity = res[0].stock_quantity - purchaseQuantity;
      console.log(itemQuantity);
      purchaseItems();


  });

};






function processAnswers(answers){
  console.log("you chose:", answers);
  itemId = answers.id;
  purchaseQuantity = answers.units;
  console.log(itemId);
  // answers = 
  afterprompt();
}
var question = [
{
    message: "Which product would you like to buy?",
    type: "input",
    name: "id",
    // validate: function validateFirstName(item_id){
    //     if (isNaN(item_id) || item_id === ""){
    //         return item_id;

    //     }
    // }

},{
    message: "how many units would you like to buy?",
    type: "input",
    name: "units"
}];
inquirer.prompt(question).then(processAnswers);





