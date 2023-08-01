module.exports = class Session {
    domainRequest;
    db;

    constructor (req, db) {
        this.db = db;
        this.domainRequest = req.body;
    }

    execute(messageType) {
        var Controller = require('../controllers/controller')
        var mesageController = (new Controller(this.db, this.domainRequest)).getController(messageType);
        mesageController.DoIt();

        this.updatedb();
    }

    updatedb() {
        const fs = require('fs');
        var ret = fs.writeFileSync('./db.json', JSON.stringify(this.db, null, "\t"));
    }

    authsession(SessionID) {
        return JSON.stringify(this.db.system.domain.session).includes(SessionID);
    }

    authuser(AttendantID, Password) {
        var UserId = "user_" + AttendantID;
        var attendantdb = this.db.system.user.AttendantID;
        
        if (!JSON.stringify(attendantdb).includes(UserId))
            return false;

        return (attendantdb[UserId].Password == Password);
    }

    generatesessionid() {
        var uuid = require ('uuid');
        var SessionID = "{" + uuid.v4().toUpperCase() + "}";
        return SessionID;
    }

    register(domainRequest) {
        var SessionID = this.generatesessionid();

        var uid = "user_" + domainRequest.params.AttendantID;
        var record = this.db.system.user.AttendantID[uid];

        record.Password = domainRequest.params.Password;
        record.SessionID = SessionID;

        var sInfo = {};
        sInfo["userid"] = uid;
        sInfo["datetime"] = new Date();
        sInfo["delivery"] = {};

        this.db.system.domain.session[SessionID] = sInfo;

        this.updatedb();

        return SessionID;
    }
    
    unregister(SessionID) {
        var result = delete this.db.system.domain.session[SessionID];
        return result;
    }
}
