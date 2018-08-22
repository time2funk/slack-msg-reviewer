const testhelper = require("./spectron-helper");
const app = testhelper.initialiseSpectron();

const chaiAsPromised = require("chai-as-promised");
const chai = require("chai");
chai.should();
chai.use(chaiAsPromised);


describe("[App Testing]", function () {

	before(function () {
		chaiAsPromised.transferPromiseness = app.transferPromiseness;
		return app.start();      
	});

	describe("start app", function () {
		it('open app window', function () {
			return app.client.waitUntilWindowLoaded().getWindowCount().should.eventually.equal(1);
		});
	});


	after(function () {
		if (app && app.isRunning()) {
			return app.stop();
		}
	});

});