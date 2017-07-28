var writePool=require('./writePool.js');

exports.buy=function(req,resp){

	if(!req.session.username)	
{
	resp.send({"message":"You are not currently logged in"});	
}	

else
{
	var products=req.body.products;

	var username=req.session.username;

		var query="insert into purchasehistory(username,asin) values";


    for(var i=0;i<products.length;i++)
    {
    	console.log("Product array:"+products[i].asin);

    	if(i)
    	{
    		query+=',';
    	}	

    	query+="('"+username+"','"+products[i].asin+"')";


    }

    console.log(query);


    writePool.getConnection(function(err, connection) {	

    	connection.query(query,function(err,results,fields){

    		if(err) {

					resp.send({"message":"There are no products that match that criteria"});

					console.log(err.code);

				
			       } //end of inner if

			    else  {

                    if(products.length>1)
                {

                    var recommendation_query="insert into recommendation(bought,alsobought) values";

                    var query_Str;

                    for(var i=0;i<products.length;i++)
                    {
                        for(var j=0;j<products.length;j++)
                        {
                            if(i==j)
                                continue;

                            recommendation_query+="('"+products[i].asin+"','"+products[j].asin+"')";


                            if(i!=products.length-1 || j!=products.length-2)
                            recommendation_query+=",";

                        }    

                    }  // end of for

                    console.log("Query to be executed:"+recommendation_query);

                    writePool.getConnection(function(err, connection) { 

                    connection.query(recommendation_query,function(err,results,fields){  

                        if(!err)
                       {
                        resp.send({"message":"The action was successful"});
                       }  
                       else {

                        resp.send({"message":"There is an error in query"});
                       }   

                     });   
                  }); // end of inner writePool

                 }   

                 else
              {
                  resp.send({"message":"The action was successful"});
              }      
                                

			     } // end of inner else

			connection.release();

    	}); // end of connection

    });	// end of write Pool

} // end of else



} // end of buy function