var connectionPool=require('./Connection.js');


exports.view=function(req,resp){


var asin=req.body.asin;
var keyword=req.body.keyword;
var group=req.body.group;
var i=0;

if(typeof asin ==='undefined' && typeof keyword ==='undefined' && typeof group ==='undefined')
{
	connectionPool.getConnection(function(err, connection) {


		connection.query('select asin,productName from productdata',function(err,result,fields){

			resp.end(JSON.stringify({
					"product":result
				}
				));
			
		});	 // end of connection

		});// end of connection Pool		
	
} // end of if
else if(typeof keyword ==='undefined' && typeof group ==='undefined')
{
	connectionPool.getConnection(function(err, connection) {


		connection.query('select asin,productName from productdata where asin=?',[asin],function(err,result,fields){

			if(result.length<=0)
			{
				resp.send({"message":"There are no products that match that criteria"});
			}	

			else
		  {		
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
	connectionPool.getConnection(function(err, connection) {


		connection.query('select asin,productName from productdata where productName LIKE ?','%'+keyword+'%',function(err,result,fields){

			if(err)
			{
				resp.send({"message":"Error in query"});
				console.log(err);
			}	

			else if(result.length<=0)
			{
				resp.send({"message":"There are no products that match that criteria"});
			}	

			else
		  {		
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
	connectionPool.getConnection(function(err, connection) {


		connection.query('select asin,productName from productdata where  product_group=?',[group],function(err,result,fields){

			if(err)
			{
				resp.send({"message":"Error in query"});
				console.log(err);
			}	

			else if(result.length<=0)
			{
				resp.send({"message":"There are no products that match that criteria"});
			}	

			else
		  {		
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
	connectionPool.getConnection(function(err, connection) {


		connection.query('select asin,productName from productdata where  (productDescription LIKE ? OR productName LIKE ?) AND product_group=?',['%'+keyword+'%','%'+keyword+'%',group],function(err,result,fields){

			if(err)
			{
				resp.send({"message":"Error in query"});
				console.log(err);
			}	

			else if(result.length<=0)
			{
				resp.send({"message":"There are no products that match that criteria"});
			}	

			else
		  {		
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
	connectionPool.getConnection(function(err, connection) {


		connection.query('select asin,productName from productdata where  asin=? AND product_group=?',[asin,group],function(err,result,fields){

			if(err)
			{
				resp.send({"message":"Error in query"});
				console.log(err);
			}	

			else if(result.length<=0)
			{
				resp.send({"message":"There are no products that match that criteria"});
			}	

			else
		  {		
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
	connectionPool.getConnection(function(err, connection) {


		connection.query('select asin,productName from productdata where  asin=? AND ( productDescription LIKE ? OR productName LIKE ? )',[asin,'%'+keyword+'%','%'+keyword+'%'],function(err,result,fields){

			if(err)
			{
				resp.send({"message":"Error in query"});
				console.log(err);
			}	

			else if(result.length<=0)
			{
				resp.send({"message":"There are no products that match that criteria"});
			}	

			else
		  {		
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
	connectionPool.getConnection(function(err, connection) {


		connection.query('select asin,productName from productdata where  asin=? AND ( productDescription LIKE ? OR productName LIKE ? ) AND product_group=?',[asin,'%'+keyword+'%','%'+keyword+'%',group],function(err,result,fields){

			if(err)
			{
				resp.send({"message":"Error in query"});
				console.log(err);
			}	

			else if(result.length<=0)
			{
				resp.send({"message":"There are no products that match that criteria"});
			}	

			else
		  {		
				resp.end(JSON.stringify({
					"product":result
				}
				));

		  }		
			
		});	 // end of connection

		});// end of connection Pool

} // end of if else





} // end of view function