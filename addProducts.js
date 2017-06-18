var connectionPool=require('./Connection.js');

var isEmpty=require('./checkEmpty.js');

exports.add=function(req,resp){


if(!req.session.username)	
{
	resp.send({"message":"You are currently not logged in"});	
}	

else if(req.session.role==="admin")
{
	var asin=req.body.asin;
	var productName=req.body.productName;
	var productDescription=req.body.productDescription;
	var product_group=req.body.group;	
	
	var sql="insert into productdata(asin,productName,productDescription,product_group) values(?,?,?,?)";

	if(isEmpty.check(asin) || isEmpty.check(productName) || isEmpty.check(productDescription) || isEmpty.check(product_group))
	{

			resp.send({"message":"The input you provided is not valid"});
	}

	else
   {

   		
		connectionPool.getConnection(function(err, connection) {


			connection.query(sql,[asin,productName,productDescription,product_group],function(err,result,fields){

				if(err) {

					resp.send({"message":"The input you provided is not valid"});

					console.log(err.code);

				
			       } //end of inner if

			    else  {

				resp.send({"message":productName+" was registered successfully"});

			          } // end of inner else

			connection.release();

			});	
   });	

   }	// end of else
 } // end of else if  

else
{
	resp.send({"message":"You must be an admin to perform this action"});
}


} // end of add products	