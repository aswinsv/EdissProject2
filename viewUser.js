var connectionPool=require('./Connection.js');

var isEmpty=require('./checkEmpty.js');


exports.view=function(req,resp){

	var fname=req.body.fname;

	var lname=req.body.lname;

	connectionPool.getConnection(function(err, connection) {


			if(!req.session.username)	
		{
			resp.send({"message":"You are currently not logged in"});	
		}	

		else if(req.session.role==="admin")
		{

			if(isEmpty.check(fname) && isEmpty.check(lname))
			{	

					connection.query('select * from userdata',function(err,result,fields){

						if(err)
						{
							resp.send(err);
						}	

						else
						{
							
							var output=JSON.stringify({
								message:"The action was successful",
								user:result
							});

							
							resp.end(output);


								
						}	

			        }); // end of connection query	

			        connection.release(); //release connection
			} // end of if		

			else if(isEmpty.check(lname))
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
							var output=JSON.stringify({
								message:"The action was successful",
								user:result
							});

							
							resp.end(output);
						}	

			        }); // end of connection query	

			        connection.release(); //release connection
			} // end of if		

			else if(isEmpty.check(fname))
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
							var output=JSON.stringify({
								message:"The action was successful",
								user:result
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
							var output=JSON.stringify({
								message:"The action was successful",
								user:result
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

	

   

	