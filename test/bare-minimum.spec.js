const { expect } = require('chai');

const server = require('../server/server');

describe('server.js', () => {

    it('The server should exist', () => {
        expect(server).to.exist;
    });
});