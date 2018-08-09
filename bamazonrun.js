var mysql = require("mysql");
var inquirer = require('inquirer');
var itemId = "";

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

function afterConnection(){
    connection.query("SELECT * FROM products", function(err, res1){
        if (err) throw err;
        console.log(res1);
        console.log("please enter the product Id you wish to purchase");
        
    });
    // connection.query("SELECT * FROM products WHERE department_name ='beverages'", function(err, res2){
    //     if (err) throw err;
    //     console.log(res2);

    // });

    // connection.end();
};


function searchForItemId(){
    connection.query("SELECT * FROM products WHERE item_id ='" + answers + "'", function(err, res2){
        if (err) throw err;
        console.log(res2);
        console.log(itemId);
        
    });
    // connection.query("SELECT * FROM products WHERE department_name ='beverages'", function(err, res2){
    //     if (err) throw err;
    //     console.log(res2);

    // });

    connection.end();
};








// function afterprompt(){
//   // connection.query("SELECT * FROM products", function(err, res1){
//   //     if (err) throw err;
//   //     console.log(res1);
      
//   // });
//   connection.query("SELECT * FROM products WHERE department_name ='" + answers + "'", function(err, res2){
//       if (err) throw err;
//       console.log(res2);

//   });

//   connection.end();
// };






function processAnswers(answers){
  console.log("You chose:", answers);
//  var itemId = itemId + answers;
//  console.log(itemId);
 searchForItemId();
    // connection.query("SELECT * FROM products WHERE department_name ='beverages'", function(err, res2){
    //     if (err) throw err;
    //     console.log(res2);

    // });


}
var questions = [
{
    message: "",
    type: "input",
    name: "product Id",

}];
inquirer.prompt(questions).then(processAnswers);




//UPDATE products SET ? WHERE ?,
//[
  //{
//quantity: 100
//flavor: "rocky road"
//}
//],

//