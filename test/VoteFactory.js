const BigNumber = web3.BigNumber;
const expect = require('chai').expect;
const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(web3.BigNumber))
    .should();

import expectThrow from './helpers/expectThrow';

var VoteFactory = artifacts.require('./VoteFactory');

contract('VoteFactory', function(accounts) {
    let voteFactory;

    const owner = accounts[0];
    const voteOwner = accounts[1];
    const voter0 = accounts[2];
    const voter1 = accounts[3];
    const voter2 = accounts[4];

    const question0 = 'Question 0';
    const answer0 = 'Answer 0';
    const answer1 = 'Answer 1';

    const gasPrice = web3.toWei('15', 'gwei');

    beforeEach('setup contract for each test', async function () {
        voteFactory = await VoteFactory.new({from: owner});
    }); 

    it('has an owner', async function () {
        expect(await voteFactory.owner()).to.equal(owner);
    });

    it('features is secure', async () => {
        await voteFactory.createVote(question0, {from: voteOwner});
        await expectThrow(voteFactory.addAnswer(0, answer0, {from: voter0}));
        await expectThrow(voteFactory.startVote(0, {from: voter0}));
        await expectThrow(voteFactory.stopVote(0, {from: voter0}));
    });

    it('creating vote with answers', async () => {
        await voteFactory.createVote(question0, {from: voteOwner});

        const voteId = 0;

        await voteFactory.addAnswer(voteId, answer0, {from: voteOwner});
        await voteFactory.addAnswer(voteId, answer1, {from: voteOwner});
    });

    it('check results', async () => {
        await voteFactory.createVote(question0, {from: voteOwner});

        const voteId = 0;

        await voteFactory.addAnswer(voteId, answer0, {from: voteOwner});
        await voteFactory.addAnswer(voteId, answer1, {from: voteOwner});
        await voteFactory.startVote(voteId, {from: voteOwner});
        
        const answer0_id = 0;
        const answer1_id = 1;

        await voteFactory.cast(voteId, answer0_id, {from: voter0});
        await voteFactory.cast(voteId, answer0_id, {from: voter1});
        await voteFactory.cast(voteId, answer1_id, {from: voter2});

        await voteFactory.stopVote(voteId, {from: voteOwner});

        await expect(await voteFactory.results(voteId)).to.equal(answer0);
    });

    it('voting a mark status', async () => {
        await voteFactory.createVote(question0, {from: voteOwner});

        const voteId = 0;

        await voteFactory.addAnswer(voteId, answer0, {from: voteOwner});
        await voteFactory.addAnswer(voteId, answer1, {from: voteOwner});
        
        const answer0_id = 0;
        const answer1_id = 1;

        await expectThrow(voteFactory.cast(voteId, answer0_id, {from: voter0}));

        await voteFactory.startVote(voteId, {from: voteOwner});
        await voteFactory.cast(voteId, answer0_id, {from: voter0});

        expect(await voteFactory.isStopped(voteId)).to.equal(false);

        await voteFactory.stopVote(voteId, {from: voteOwner});

        await expect(await voteFactory.isStopped(voteId)).to.equal(true);
    });

    it('cast when it`s allowed', async () => {
        await voteFactory.createVote(question0, {from: voteOwner});

        const voteId = 0;

        await voteFactory.addAnswer(voteId, answer0, {from: voteOwner});
        await voteFactory.addAnswer(voteId, answer1, {from: voteOwner});
        
        const answer0_id = 0;
        const answer1_id = 1;

        await expectThrow(voteFactory.cast(voteId, answer0_id, {from: voter0}));
    });
});
