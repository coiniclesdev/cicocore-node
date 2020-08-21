'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export cicocore-lib', function() {
    var cicocore = require('../');
    should.exist(cicocore.lib);
    should.exist(cicocore.lib.Transaction);
    should.exist(cicocore.lib.Block);
  });
});
