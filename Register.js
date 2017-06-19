var connectionPool=require('./Connection.js');

exports.registerUser=function(req,resp){

	var fname=req.body.fname;
	var lname=req.body.lname;
	var address=req.body.address;
	var city=req.body.city;	
	var state=req.body.state;	
	var zip=req.body.zip;	
	var email=req.body.email;	
	var username=req.body.username;	
	var password=req.body.password;	

	var sql="insert into userdata(fname,lname,address,city,state,zip,email,username,password) values(?,?,?,?,?,?,?,?,?)";


	if(typeof fname ==='undefined' || typeof lname ==='undefined' || typeof address ==='undefined' || typeof city ==='undefined' || typeof state ==='undefined' ||
		       typeof zip ==='undefined' || typeof email ==='undefined' || typeof username ==='undefined' || typeof password ==='undefined')
	{
			resp.send({"message":"The input you provided is not valid"});
	}	

	else
{		
		connectionPool.getConnection(function(err, connection) {


			connection.query(sql,[fname,lname,address,city,state,zip,email,username,password],function(err,result,fields){

				
			if(err) {

				resp.send({"message":"The input you provided is not valid"});

				console.log(err.code);

				
			} //end of if

			else{

				resp.send({"message":fname+" was registered successfully"});

			}

			connection.release();
					
			}); //query

			}); // end of getConnection

} // end of else
		

		
  
} // end of registerUser
