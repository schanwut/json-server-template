var Controller = require('./controller')

module.exports = class LoginController extends Controller {
    constructor(db, domainRequest) {
        super(db, domainRequest);
        this.responsedb = db.login;
    }

    DoIt () {
        if (!this.authuser)
        {
            this.responsedb.result.SessionID = "";
            this.responsedb.result.ResMessage = this.resmessagedb["gen_invaliduser_password"];
            return;
        }
        
        this.responsedb.result.SessionID = this.domainsession.register (this.domainRequest);
        this.responsedb.result.ResMessage = this.resmessagedb["gen_success"];
    }
}
