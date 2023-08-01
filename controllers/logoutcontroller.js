var Controller = require('./controller')

module.exports = class LogoutController extends Controller {
    constructor(db, domainRequest) {
        super(db, domainRequest);
        this.responsedb = db.logout;
    }

    DoIt () {
        if (!this.authsession)
        {
            this.responsedb.result.ResMessage = this.resmessagedb["gen_invalidsessionid"];
            return
        }
        
        this.domainsession.unregister (this.domainRequest.params.SessionID);
        this.responsedb.result.ResMessage = this.resmessagedb["gen_success"];
    }
}
