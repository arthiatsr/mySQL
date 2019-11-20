var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "browny",
    database: "bamazon"
});
connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    menuOptions();
});

function menuOptions()
{
    inquirer.prompt(
        {        
            type: "list",
            name: "choiceinput",
            message: "Please select from the menu option",
            choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]
            
        }
        ).then(function(menuoptions){
            console.log(menuoptions);
        });
}