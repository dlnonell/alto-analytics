(function () {
  'use strict';

  describe('Given the YT-like progress bar app', function () {
    describe('when it is loaded', function () {
      it('should have progressValue set as 0', function () {
        assert.equal(app.progressValue, 0);
      });
    });
  });
})();
