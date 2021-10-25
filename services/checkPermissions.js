
const mashup = require('./mashup')
const casbinConf = require('../casbinConf')

exports.checkPermissions = async function (req, res) {
    try {
        
        //Construct reqPayload from setUpRequest
        var reqPayload = JSON.parse(req.rawBody);
         console.log("Inside checkPermissions.......")
            const check = await casbinConf.run(reqPayload)
            console.log("check----->",check)
            res.set('Content-Type', 'application/json');
			res.send(check);
			res.status(200).end();
       
    } catch (e) {
        console.log(e);
        return mashup.returnError(res, 500, '01', "Internal error", reqPayload, e);
    }
}