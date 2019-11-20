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
    myquery();
});

function myquery()
{
    var query = connection.query(
        "SELECT item_id ,product_name, price, stock_qty FROM products where department_name = 'apparel' or department_name = 'cosmetic'",
        function(err,saleitem)
        {
            if(err) throw err;
            console.log("sale items: ", saleitem);
            inquirer.prompt([
                {        
                    name: "idinput",
                    message: "id of the product you would like to buy",
                    
                },
                {        
                    name: "unitsinput",
                    message: "how many units of the product you would like to buy",
                    
                }]).then(function(itemrequest){
                    console.log("itemrequested: " , itemrequest);
                    for(var i=0;i<saleitem.length;i++)
                    {
                        if(saleitem[i].item_id == itemrequest.idinput)
                        {
                            if(itemrequest.unitsinput <= saleitem[i].stock_qty)
                            {
                                var itemid = saleitem[i].item_id;
                                var itemprice = saleitem[i].price;
                                var currentbalstockqty = saleitem[i].stock_qty - itemrequest.unitsinput;
                                var totalpurchace = itemrequest.unitsinput * saleitem[i].price;
                                var itemname = saleitem[i].product_name;
                                var originalbalstockqty = saleitem[i].stock_qty;
                                
                                var query = connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [{
                                stock_qty : currentbalstockqty
                                },
                                {
                                item_id : saleitem[i].item_id
                                }],
                                function(err, updatedata) {
                                if (err) throw err;

                                console.log(
                                "Order Details: \n",
                                "item id: ", itemid, "\n",
                                "item name: ", itemname, "\n",
                                "item price: ", itemprice, "\n",
                                "original balance stock available: ", originalbalstockqty, "\n",
                                "Current balance stock available: ", currentbalstockqty, "\n",
                                "total purchace cost: ", totalpurchace                                       
                                );
                        
                            })  
                            } 
                            else 
                            {
                                console.log("Insufficient quantity!");
                            }
                        }
                                            
                    } 
                    connection.end();       
                });                
        }
    );
    
}





