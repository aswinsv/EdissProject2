var readPool=require('./writePool.js');

exports.recommend=function(req,resp){


	if(!req.session.username)	
{
	resp.send({"message":"You are not currently logged in"});	
}	

else
{

	var req_asin=req.body.asin;

	var query="select alsobought ,count(*) as COUNT from recommendation group by bought,alsobought having bought=? order by COUNT DESC LIMIT 5";

	readPool.getConnection(function(err, connection) {

		
		connection.query(query,req_asin,function(err,results,fields){

			if(results.length==0)
			{
				resp.send({"message":"There are no recommendations for that product"});
			}	

			else
		 {
		 	var realResults = results.map(function(rResult) {
								var obj = {};
								obj.asin = rResult.alsobought;
								return obj;
			});

			var output=JSON.stringify({
								message:"The action was successful",
								user:realResults
							});

							
							resp.end(output);

		 }




		}); // end of connection	






	});	// end of readPool



} // end of else





} // end of recommend




