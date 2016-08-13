
/*
 * GET users listing.
 */
exports.index = function(req, res){
   res.json({ message: 'hooray! welcome to our api!' });   
};



exports.userlist = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM customer',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );

            else
            res.json({data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};


exports.callget = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM userinfo',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
            else
            res.json({data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};


exports.searchuser = function(req, res){
    
    var mobile = req.params.mobile;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM customer WHERE mobile = ?',[mobile],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
            else
            res.json({data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};




exports.searchcalldetails = function(req, res){
    
    var tophonenumber = req.params.tophonenumber;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM userinfo WHERE tophonenumber = ?',[tophonenumber],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
            else
            res.json({data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

/*Save the customer*/
exports.adduser = function(req,res){
    
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            firstname:req.body.firstname,
            lastname : req.body.lastname,
            mobile    : req.body.mobile
        
        };
        
        var query = connection.query("INSERT INTO customer set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
          else
          res.redirect('/userlist');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};


exports.deleteuser = function(req,res){
          
     var mobile = req.params.mobile;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM customer  WHERE mobile = ? ",[mobile], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            else   
             res.redirect('/userlist');
             
        });
        
     });
};



/*Save the customer*/
exports.callpost = function(req,res){
    
    
    req.getConnection(function (err, connection) {
        

        var mobile = req.params.mobile;

        var data = {
            tophonenumber : mobile,
            fromphonenumber : req.body.fromphonenumber,
            calltime : req.body.calltime,
            calldate : req.body.calldate,
            callduration : req.body.callduration
        
        };
        
        var query = connection.query("INSERT INTO userinfo set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
        else
        res.json({ message: 'Successfully added' });          
        });
        
       // console.log(query.sql); get raw query
    
    });
};





exports.deletecalldetails = function(req,res){
          
     var tophonenumber = req.params.tophonenumber;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM userinfo  WHERE tophonenumber = ? ",[tophonenumber], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            else
             res.json({ message: 'Successfully deleted' });
             
        });
        
     });
};