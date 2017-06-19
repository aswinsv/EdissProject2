var connectionPool=require('./Connection.js');

exports.view=function(req,resp){

	var fname=req.body.fname;

	var lname=req.body.lname;

	connectionPool.getConnection(function(err,connection) {


			if(!req.session.username)	
		{
			resp.send({"message":"You are currently not logged in"});	
		}	

		else if(req.session.role==="admin")
		{

			if(typeof fname ==='undefined' && typeof lname ==='undefined')
			{	

					connection.query('select * from userdata',function(err,result,fields){

						if(err)
						{
							resp.send(err);
						}	

						else
						{
							
							var realResults = result.map(function(rResult) {
								var obj = {};
								obj.fname = rResult.fname;
								obj.lname = rResult.lname;
								obj.userId = rResult.username;
								return obj;
							});



							var output=JSON.stringify({
								message:"The action was successful",
								user:realResults
							});

							
							resp.end(output);


								
						}	

			        }); // end of connection query	

			        connection.release(); //release connection
			} // end of if		

			else if(typeof fname!='undefined' && typeof lname==='undefined')
			{	

					connection.query('select * from userdata where fname LIKE ?','%'+[fname]+'%',function(err,result,fields){

						if(err)
						{
							resp.send(err);
						}	

						else if(result.length<=0)
						{
							resp.send({"message":"There are no users that match that criteria"});
						}	

						else
						{
							var realResults = result.map(function(rResult) {
								var obj = {};
								obj.fname = rResult.fname;
								obj.lname = rResult.lname;
								obj.userId = rResult.username;
								return obj;
							});
							
							var output=JSON.stringify({
								message:"The action was successful",
								user:realResults
							});

							
							resp.end(output);
						}	

			        }); // end of connection query	

			        connection.release(); //release connection
			} // end of if		

			else if(typeof lname!='undefined' && typeof fname==='undefined')
			{	

					connection.query('select * from userdata where lname LIKE ?','%'+[lname]+'%',function(err,result,fields){

						if(err)
						{
							resp.send(err);
						}	

						else if(result.length<=0)
						{
							resp.send({"message":"There are no users that match that criteria"});
						}	

						else
						{
							var realResults = result.map(function(rResult) {
								var obj = {};
								obj.fname = rResult.fname;
								obj.lname = rResult.lname;
								obj.userId = rResult.username;
								return obj;
							});
							
							var output=JSON.stringify({
								message:"The action was successful",
								user:realResults
							});

							
							resp.end(output);
								
						}	

			        }); // end of connection query	

			        connection.release(); //release connection
			} // end of if	

			else
		{
				connection.query('select * from userdata where fname LIKE ? AND lname LIKE ?',['%'+[fname]+'%','%'+[lname]+'%'],function(err,result,fields){

						if(err)
						{
							resp.send(err);
						}
						else if(result.length<=0)
						{
							resp.send({"message":"There are no users that match that criteria"});
						}		

						else
						{
							var realResults = result.map(function(rResult) {
								var obj = {};
								obj.fname = rResult.fname;
								obj.lname = rResult.lname;
								obj.userId = rResult.username;
								return obj;
							});
							
							var output=JSON.stringify({
								message:"The action was successful",
								user:realResults
							});
							
							resp.end(output);
						}	

			        }); // end of connection query	

			        connection.release(); //release connection

		}		



	} // end of else if


	else
	{
		resp.send({"message":"You must be an admin to perform this action"});
	}
 
  }); // end of connectionPool

  	
} // end of view	

	

   

	