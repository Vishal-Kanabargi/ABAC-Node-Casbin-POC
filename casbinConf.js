
async function run(reqPayload) {
    // For Node.js:
    
    const { SequelizeAdapter } = require('casbin-sequelize-adapter')
    const casbin = require('casbin');

   const a = await SequelizeAdapter.newAdapter({
    username: 'root',
    password: 'root',
    database: 'casbin',
    dialect: 'mysql',
  });
    const e = await casbin.newEnforcer('./basic_model.conf', a)
    //const enforcer = await newEnforcer('./basic_model.conf', './basic_data.csv');
    await e.loadPolicy()

    // Async: .user, .domain, reqPayload.action, reqPayload.resource, reqPayload.attributes
    console.log("reqPayload--->", JSON.stringify(await e.loadPolicy()))
    //const res = await enforcer.enforce(reqPayload.user, reqPayload.domain, reqPayload.action, reqPayload.resource, reqPayload.attributes);
    //const res = await e.getFilteredPolicy(reqPayload.name, reqPayload.resource, reqPayload.action);
    //const res = await e.enforce(reqPayload.name , reqPayload.resource , reqPayload.action);
    // Sync:
    // const res = enforcer.enforceSync(sub, obj, act);


    /*await e.addPolicy( "data1_deny_group", "data1", "read", "deny")
    await e.addPolicy( "10", "data1_deny_group", "data1", "write", "deny")
    await e.addPolicy( "10", "data2_allow_group", "data2", "read", "allow")
    await e.addPolicy( "10", "data2_allow_group", "data2", "write", "allow")
    await e.addPolicy( "1", "alice", "data1", "write", "allow")
    await e.addPolicy( "1", "alice", "data1", "read", "allow")

    await e.addPolicy("p", "1", "bob", "data2", "read", "allow")

    await e.addPolicy("g", "bob", "data2_allow_group")
    await e.addPolicy("g", "alice", "data1_deny_group") */

    const res = await e.enforce(reqPayload.name, reqPayload.resource, reqPayload.action);


  console.log("res--->",res)
    
    if (res) {
        // permit alice to read data1
        console.log("Permited....",res)
        return isPermitable = true
      
      } else {
        console.log("There is error deny....", res)
        return isPermitable = false
        // deny the request, show an error
      }
    }
    
    module.exports = {
        run
    }
    