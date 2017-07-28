var readPool=require('./readPool.js');

module.exports.purchased=function(req,resp){

if(!req.session.username)	
{
	resp.send({"message":"You are not currently logged in"});	
}	

else if(req.session.role==="admin")
{
	var username=req.body.username;

	var sql="select p.productName as productName,count(*) AS No_Purchased from purchasehistory ph join productdata_write p on ph.asin=p.asin group by ph.username,p.productName having ph.username=?";

	readPool.getConnection(function(err, connection) {


		connection.query(sql,username,function(err,result,fields){

			if(result.length==0)
			{
				resp.send({"message":"There are no users that match that criteria"});	
			}	

			else {

				
				var realResults = result.map(function(rResult) {
								var obj = {};
								obj.productName = rResult.productName;
								obj.quantity = rResult.No_Purchased;
								return obj;
				});

				var output=JSON.stringify({
								message:"The action was successful",
								products:realResults
							});

							
							resp.end(output);

			 }


		});	// end of connection




	});	// end of readPool
} // end of elseif
else
{
	resp.send({"message":"You must be an admin to perform this action"});
}

}	