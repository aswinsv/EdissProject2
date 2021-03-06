var writePool=require('./writePool.js');

module.exports.add=function(req,resp){


	console.log("Inside add function");


if(!req.session.username)	
{
	resp.send({"message":"You are not currently logged in"});	
}	

else if(req.session.role==="admin")
{
	var asin=req.body.asin;
	var productName=req.body.productName;
	var productDescription=req.body.productDescription;
	var product_group=req.body.group;	
	
	var sql="insert into productdata_write(asin,productName,productDescription,product_group) values(?,?,?,?)";

	var sql_readTable="insert into productdata_read(asin,productName,productDescription,product_group) values(?,?,?,?)";

	if(typeof asin ==='undefined' || typeof productName ==='undefined' || typeof productDescription ==='undefined' || typeof product_group ==='undefined')
	{

			resp.send({"message":"The input you provided is not valid"});
	}

	else
   {


   		console.log("Inside else loop");
   		
		writePool.getConnection(function(err, connection) {


			connection.query(sql,[asin,productName,productDescription,product_group],function(err,result,fields){
		

				if(err) {

					resp.send({"message":"The input you provided is not valid"});

					console.log(err.code);

				
			       } //end of inner if

			    else  {

			    	connection.query(sql_readTable,[asin,productName,productDescription,product_group],function(err,result,fields){

						
				if(err) {

					resp.send({"message":"The input you provided is not valid"});

					console.log(err.code);

				
			       } //end of inner if

			    else  {

				resp.send({"message":productName+" was successfully added to the system"});

			          } // end of inner else

			});	

				
			} // end of inner else

		});	

			connection.release();
   });	

   }	// end of else
 } // end of else if  

else
{
	resp.send({"message":"You must be an admin to perform this action"});
}


} // end of add products	