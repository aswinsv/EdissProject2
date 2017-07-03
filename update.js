var connectionPool=require('./Connection.js');

var mysql=require('mysql');

exports.updateInfo=function(req,resp){

    var fname=req.body.fname;
	var lname=req.body.lname;
	var address=req.body.address;
	var city=req.body.city;	
	var state=req.body.state;	
	var zip=req.body.zip;	
	var email=req.body.email;	
	var username=req.body.username;	
	var password=req.body.password;

	

	
if(!req.session.username)
{
		resp.send({"message":"You are not currently logged in"});
}	

	if(typeof fname==='undefined' && typeof lname==='undefined' && typeof address==='undefined' && typeof city==='undefined' && typeof state==='undefined' &&
		       typeof zip==='undefined' && typeof email==='undefined' && typeof username==='undefined' && typeof password==='undefined')
{
	resp.send({"message":req.session.fname+" your information was successfully updated"});
}	

else
{
			var sqlStatement="update userdata set "
	
			connectionPool.getConnection(function(err, connection) {

			if(typeof fname !='undefined')
			{
				sqlStatement+="fname='"+fname+"' ,";
			
			} // end of if 1 

		 	if(typeof lname !='undefined')
			{
				sqlStatement+="lname='"+lname+"' ,";
				
		    } // end of if 2	

	     if(typeof address !='undefined')
		{
			sqlStatement+="address='"+address+"' ,";
			
	    } // end of if 3

	      if(typeof city !='undefined')
		{
			sqlStatement+="city='"+city+"' ,";
			
	    } // end of if 4	

	       if(typeof state !='undefined')
		{
			sqlStatement+="state='"+state+"' ,";
			
	    } // end of if 5	

	       if(typeof zip !='undefined')
		{
			sqlStatement+="zip='"+zip+"' ,";
			
	    } // end of if 6	

	       if(typeof email !='undefined')
		{

			sqlStatement+="email='"+email+"' ,";
	    } // end of if 7	


	        if(typeof username !='undefined')
		{

				sqlStatement+="username='"+username+"' ,";
	    } // end of if 8	

	       if(typeof password !='undefined')
		{
			sqlStatement+="password='"+password+"' ,";
			
	    } // end of if 9*/	

	    sqlStatement=sqlStatement.substring(0,sqlStatement.length-2);

	    sqlStatement+=" WHERE username='"+req.session.username+"'";

	    sqlStatement=mysql.format(sqlStatement);


	    connection.query(sqlStatement,function(err,result,fields){

	    	connection.release();
				
			if(err) {

				resp.send({"message":"The input you provided is not valid"});
				
			} //end of if
			else
			{	
				if(typeof fname !='undefined')
	     		resp.send({"message":fname+" your information was successfully updated"});
	     	else
	     		resp.send({"message":req.session.fname+" your information was successfully updated"});

			}	
			
       });

	    
	      
	}); // end of connection Pool
} // end of else loop			
} // end of updateInfo	