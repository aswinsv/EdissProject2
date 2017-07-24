var connectionPool=require('./Connection.js');

exports.buy=function(req,resp){

	if(!req.session.username)	
{
	resp.send({"message":"You are not currently logged in"});	
}	

else
{
	var products=req.body.products;

	resp.send({"message":"You are going to buy products"});

    for(var i=0;i<products.length;i++)
    {
    	console.log("Product array:"+products[i].asin);
    }	

}



}