

	/**
	* Returns the supplied error details in the common format
	*/
	exports.returnError= function(res, httpCode, resultCode, resultMessage, reqPayload, SBErrCode)
	{
		if (!res.headersSent) {
		res.set('Content-Type','application/json');
		res.set('X-RE-Exception', resultMessage);
		res.set('X-RE-Exception-Code', resultCode);
		res.set('X-RE-Exception-System', 'RE-API');
		res.status(httpCode);
		
		
		var errorResp = { "code" : resultCode, "message" : resultMessage };
		res.send(JSON.stringify(errorResp));

		}
	}

	exports.handleError = function(res, SBErrCode, reqPayload) {
			switch(SBErrCode){
			case "NOT_FOUND":	
					this.returnError(res, 400, '20', "Data not found in DB", reqPayload, SBErrCode);
					break;
		default:
			this.returnError(res, 503, '05', "The service is temporarily unavailable",reqPayload, SBErrCode);
		}
	}

