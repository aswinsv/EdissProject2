var readPool=require('./readPool.js');


exports.view=function(req,resp){


var asin=req.body.asin;
var keyword=req.body.keyword;
var group=req.body.group;
var i=0;

if(typeof asin ==='undefined' && typeof keyword ==='undefined' && typeof group ==='undefined')
{
	readPool.getConnection(function(err, connection) {


		connection.query('select asin,productName from productdata_read',function(err,result,fields){

				connection.release();

			resp.end(JSON.stringify({
					"product":result
				}
				));
			
		});	 // end of connection

	

		});// end of connection Pool		
	
} // end of if
else if(typeof keyword ==='undefined' && typeof group ==='undefined')
{
	readPool.getConnection(function(err, connection) {


		connection.query('select asin,productName from productdata_read where asin=?',[asin],function(err,result,fields){

			if(result.length<=0)
			{
				connection.release();
				resp.send({"message":"There are no products that match that criteria"});
			}	

			else
		  {	
		  		connection.release();	
				resp.end(JSON.stringify({
					"product":result
				}
				));

		  }		
			
		});	 // end of connection


		});// end of connection Pool

} // end of if else


else if(typeof asin ==='undefined' && typeof group ==='undefined')
{
	readPool.getConnection(function(err, connection) {


		var query="select asin,productName from productdata_read where MATCH(productName,productDescription) AGAINST ('\""+keyword+"\"' IN BOOLEAN MODE)";


		console.log("Query to be executed:"+query);


		connection.query(query,function(err,result,fields){

			if(err)
			{
				connection.release();
				resp.send({"message":"Error in query"});
				console.log(err);
			}	

			else if(result.length<=0)
			{
				connection.release();
				resp.send({"message":"There are no products that match that criteria"});

			}	

			else
		  {		
		  		connection.release();
				resp.end(JSON.stringify({
					"product":result
				}
				));

		  }		
			
		});	 // end of connection

		

		});// end of connection Pool

} // end of if else

else if(typeof asin ==='undefined' && typeof keyword ==='undefined')
{
	readPool.getConnection(function(err, connection) {


		connection.query('select asin,productName from productdata_read where  product_group=?',[group],function(err,result,fields){

			if(err)
			{
				connection.release();
				resp.send({"message":"Error in query"});
				console.log(err);
			}	

			else if(result.length<=0)
			{
				connection.release();
				resp.send({"message":"There are no products that match that criteria"});
			}	

			else
		  {	
		  		connection.release();	
				resp.end(JSON.stringify({
					"product":result
				}
				));

		  }		
			
		});	 // end of connection

		

		});// end of connection Pool

} // end of if else



else if(typeof asin ==='undefined')
{
	readPool.getConnection(function(err, connection) {


		var query_asin="select asin,productName from productdata_read where MATCH(productDescription,productName) AGAINST('\""+keyword+"\"' IN BOOLEAN MODE) AND product_group=?";

		console.log("Query to be executed:"+query_asin);

		connection.query(query_asin,group,function(err,result,fields){

			if(err)
			{
				connection.release();
				resp.send({"message":"Error in query"});
				console.log(err);
			}	

			else if(result.length<=0)
			{
				connection.release();
				resp.send({"message":"There are no products that match that criteria"});
			}	

			else
		  {	
		  		connection.release();	
				resp.end(JSON.stringify({
					"product":result
				}
				));

		  }		
			
		});	 // end of connection

	

		});// end of connection Pool

} // end of if else


else if(typeof keyword ==='undefined')
{
	readPool.getConnection(function(err, connection) {


		connection.query('select asin,productName from productdata_read where  asin=? AND product_group=?',[asin,group],function(err,result,fields){

			if(err)
			{
				connection.release();	
				resp.send({"message":"Error in query"});
				console.log(err);
			}	

			else if(result.length<=0)
			{
				connection.release();	
				resp.send({"message":"There are no products that match that criteria"});
			}	

			else
		  {	
		  		connection.release();		
				resp.end(JSON.stringify({
					"product":result
				}
				));

		  }		
			
		});	 // end of connection

		

		});// end of connection Pool

} // end of if else


else if(typeof group ==='undefined')
{
	readPool.getConnection(function(err, connection) {


		var query_group="select asin,productName from productdata_read where  asin=? AND MATCH(productDescription,productName) AGAINST ('\""+keyword+"\"' IN BOOLEAN MODE)";

		console.log("Query to be executed:"+query_group);

		connection.query(query_group,asin,function(err,result,fields){

			if(err)
			{
				connection.release();	
				resp.send({"message":"Error in query"});
				console.log(err);
			}	

			else if(result.length<=0)
			{
				connection.release();	
				resp.send({"message":"There are no products that match that criteria"});
			}	

			else
		  {
		  		connection.release();			
				resp.end(JSON.stringify({
					"product":result
				}
				));

		  }		
			
		});	 // end of connection

		

		});// end of connection Pool

} // end of if else


else 
{
	readPool.getConnection(function(err, connection) {


		var query_final="select asin,productName from productdata_read where  asin=? AND MATCH(productDescription,productName) AGAINST ('\""+keyword+"\"' IN BOOLEAN MODE) AND product_group=?";

		console.log("Query to be executed:"+query_final);

		connection.query(query_final,[asin,group],function(err,result,fields){

			if(err)
			{
				connection.release();	
				resp.send({"message":"Error in query"});
				console.log(err);
			}	

			else if(result.length<=0)
			{
				connection.release();	
				resp.send({"message":"There are no products that match that criteria"});
			}	

			else
		  {
		  		connection.release();			
				resp.end(JSON.stringify({
					"product":result
				}
				));

		  }		
			
		});	 // end of connection

		

		});// end of connection Pool

} // end of if else





} // end of view function