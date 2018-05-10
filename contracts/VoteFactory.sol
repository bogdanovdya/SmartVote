pragma solidity ^0.4.19;

import "./Ownable.sol";

contract VoteFactory is Ownable {
    modifier ownerOfVote(uint _voteId) {
        require(voteToOwner[_voteId] == msg.sender);
        _;
    }
    modifier stateOf(uint _voteId, State _state) {
        require(votes[_voteId].state == _state);
        _;
    }

    event CreateVote(uint id, string question);
    event StartVote(uint id);
    event StopVote(uint id);

    enum State {
        Initial,
        Started,
        Stopped
    }

    struct Vote {
        State state;
        string question;
        string[] answers;
        address[] voters;
        
        mapping (uint => uint) voterToAnswer;
    }

    Vote[] public votes;
    mapping (uint => address) public voteToOwner;
    
    function kill() public onlyOwner {
        selfdestruct(owner);
    }
    
    function createVote(string _question) external {
        uint voteId = votes.push(Vote(State.Initial, _question, new string[](0), new address[](0))) - 1;
        voteToOwner[voteId] = msg.sender;
        emit CreateVote(voteId, _question);
    }

    function addAnswer(uint _voteId, string _answer) external ownerOfVote(_voteId) {
        votes[_voteId].answers.push(_answer);
    }

    function voteAnswer(uint _voteId, uint _answerId) public view returns(string) {
        return votes[_voteId].answers[_answerId];
    }
    
    function startVote(uint _voteId) external ownerOfVote(_voteId) {
        votes[_voteId].state = State.Started;
        emit StartVote(_voteId);
    }
    
    function stopVote(uint _voteId) external ownerOfVote(_voteId) stateOf(_voteId, State.Started) {
        votes[_voteId].state = State.Stopped;
        emit StopVote(_voteId);
    }

    function _castVoter(uint _voteId, uint _answerId, uint _voterId) private {
        votes[_voteId].voterToAnswer[_voterId] = _answerId;
    }

    function cast(uint _voteId, uint _answerId) external stateOf(_voteId, State.Started) {
        address[] storage voters = votes[_voteId].voters;
        for (uint i = 0; i < voters.length; i++)
            if (voters[i] == msg.sender) {
                _castVoter(_voteId, _answerId, i);
                return;
            }

        uint voterId = votes[_voteId].voters.push(msg.sender) - 1;            
        _castVoter(_voteId, _answerId, voterId);
    }

    function results(uint _voteId) external view returns(string) {
        Vote storage vote = votes[_voteId];
        uint[] memory result = new uint[](vote.answers.length);
        address[] storage voters = vote.voters;

        for (uint i = 0; i < voters.length; i++) {
            result[vote.voterToAnswer[i]]++;
        }

        uint maxId = 0;
        uint max = result[0];

        for (i = 0; i < result.length; i++) {
            if (result[i] > max) {
                maxId = i;
                max = result[i];
            }
        }

        return vote.answers[maxId];
    }

    function isStopped(uint _voteId) external view returns(bool) {
        return votes[_voteId].state == State.Stopped;
    }
    
}
