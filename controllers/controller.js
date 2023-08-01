module.exports = class Controller {
    db;
    controller;
    domaindb;
    userdb;
    configdb;
    resmessagedb;
    responsedb;
    domainRequest;
    domainsession;
    authsession;
    authuser;

    constructor(db, domainRequest) {
        this.db = db;
        this.domainRequest = domainRequest;
        this.domaindb = db.system.domain;
        this.userdb = db.system.user;
        this.configdb = db.system.config;
        this.resmessagedb = db.system.domain.resmessage;
        this.responsedb = {};

        var Session = require("../domain/session");
        this.domainsession = new Session(domainRequest, db);
        this.authsession = this.domainsession.authsession(domainRequest.params.SessionID);
        this.authuser = this.domainsession.authuser(domainRequest.params.AttendantID, domainRequest.params.Password);
    }

    getController(messageType) {
        switch (messageType) {
            case this.domaindb.messagetype.LOGIN:
            {
                var LoginController = require('./logincontroller')
                this.controller = new LoginController(this.db, this.domainRequest);
            }
            break;
            case this.domaindb.messagetype.LOGOUT:
            {
                var LogoutController = require('./logoutcontroller')
                this.controller = new LogoutController(this.db, this.domainRequest);
            }
            break;
        }
        return this.controller;
    }

    DoIt () {}
}
