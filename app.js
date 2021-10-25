 var express = require('express');
 var checkPermissions = require('./services/checkPermissions');
 
 var app = express();
 
 app.use(function(req, res, next) {
     var data = '';
     req.setEncoding('utf8');
     req.on('data', function(chunk) {
         data += chunk;
     });
     req.on('end', function() {
         req.rawBody = data;
         next();
     });
 });
 
 
 app.post('/checkPermissions', checkPermissions.checkPermissions);
 
 //disables the etag response header added by default by express
 app.disable('etag');
 
 app.all("*", function(req,res){
     // Headers
     res.set({
         'Content-Type': 'text/plain',
     });

     res.status(404);
    res.send("Unsupported API request: "+req.method+" for resource "+req.path);
 
 });
 
 app.listen(3000);
 console.log("Node application has started on port 3000. Make requests to http://127.0.0.1:3000/");
 
 
 