var writePool=require('./writePool.js');

exports.modify=function(req,resp){

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
	
	var sql="update productdata_write set productName=?,productDescription=?,product_group=? where asin=?";

	var sql_readTable="update productdata_read set productName=?,productDescription=?,product_group=? where asin=?";


	if(typeof asin ==='undefined' || typeof productName ==='undefined' || typeof productDescription ==='undefined' || typeof product_group ==='undefined')
	{

			resp.send({"message":"The input you provided is not valid"});
	}

	else
   {

   		
		writePool.getConnection(function(err, connection) {


			connection.query(sql,[productName,productDescription,product_group,asin],function(err,result,fields){


				if(err) {

					resp.send({"message":"The input you provided is not valid"});

					console.log(err.code);

				
			       } //end of inner if

			    else  {

			    connection.query(sql_readTable,[productName,productDescription,product_group,asin],function(err,result,fields){

			    	if(err) {

					resp.send({"message":"The input you provided is not valid"});

					console.log(err.code);

				
			       } //end of inner if

			    else  {

				resp.send({"message":productName+" was successfully updated"});

			          } // end of inner else

			
			});	


			    connection.release();

		} // end of inner else

			

			});	
   }); // end of writeppol	

   }	// end of else
 } // end of else if  

else
{
	resp.send({"message":"You must be an admin to perform this action"});
}	

} // end of modify function	
