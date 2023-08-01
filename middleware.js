var jsondb = require('./db.json');
var Session = require('./domain/session')

module.exports = function (req, res, next) {
    if (req.method === 'POST') {
        session = new Session(req, jsondb)
        
        if (req.path.includes('/login')) {
            session.execute(jsondb.system.domain.messagetype.LOGIN);
            return res.jsonp(jsondb.login)
        }

        if (req.path.includes('/logout')) {
            session.execute(jsondb.system.domain.messagetype.LOGOUT);
            return res.jsonp(jsondb.logout)
        }
    }

  next()
}
