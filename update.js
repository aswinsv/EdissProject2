var connectionPool=require('./Connection.js');

var isEmpty=require('./checkEmpty.js');

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

	if(isEmpty.check(fname) && isEmpty.check(lname) && isEmpty.check(address) && isEmpty.check(city) && isEmpty.check(state) &&
		       isEmpty.check(zip) && isEmpty.check(email) && isEmpty.check(username) && isEmpty.check(password))
{
	resp.send({"message":req.session.fname+" your information was successfully updated"});
}	

else
{
			var sqlStatement="update userdata set "
	
			connectionPool.getConnection(function(err, connection) {

			if(!isEmpty.check(fname))
			{
				sqlStatement+="fname='"+fname+"' ,";
			
			} // end of if 1 

		 	if(!isEmpty.check(lname))
			{
				sqlStatement+="lname='"+lname+"' ,";
				
		    } // end of if 2	

	     if(!isEmpty.check(address))
		{
			sqlStatement+="address='"+address+"' ,";
			
	    } // end of if 3

	      if(!isEmpty.check(city))
		{
			sqlStatement+="city='"+city+"' ,";
			
	    } // end of if 4	

	       if(!isEmpty.check(state))
		{
			sqlStatement+="state='"+state+"' ,";
			
	    } // end of if 5	

	       if(!isEmpty.check(zip))
		{
			sqlStatement+="zip='"+zip+"' ,";
			
	    } // end of if 6	

	       if(!isEmpty.check(email))
		{

			sqlStatement+="email='"+email+"' ,";
	    } // end of if 7	


	        if(!isEmpty.check(username))
		{

				sqlStatement+="username='"+username+"' ,";
	    } // end of if 8	

	       if(!isEmpty.check(password))
		{
			sqlStatement+="password='"+password+"' ,";
			
	    } // end of if 9	

	    sqlStatement=sqlStatement.substring(0,sqlStatement.length-2);

	    sqlStatement+=" WHERE username='"+req.session.username+"'";

	    sqlStatement=mysql.format(sqlStatement);


	    connection.query(sqlStatement,function(err,result,fields){
				
			if(err) {

				resp.send({"message":"The input you provided is not valid"});
				
			} //end of if
			else
			{	
				if(!isEmpty.check(fname))
	     		resp.send({"message":fname+" your information was successfully updated"});
	     	else
	     		resp.send({"message":req.session.fname+" your information was successfully updated"});

			}	
			
       });


	      
	}); // end of connection Pool
} // end of else loop			
} // end of updateInfo	