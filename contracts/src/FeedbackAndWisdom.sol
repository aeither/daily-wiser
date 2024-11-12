// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FeedbackAndWisdom {
    struct Feedback {
        address sender;
        uint256 timestamp;
        string message;
    }

    struct Wisdom {
        address sender;
        uint256 timestamp;
        string quote;
    }

    Feedback[] public feedbacks;
    mapping(address => Wisdom) public wisdomByUser;
    uint256 constant WISDOM_COOLDOWN = 20 hours;

    event FeedbackAdded(address indexed sender, uint256 timestamp, string message);
    event WisdomAdded(address indexed sender, uint256 timestamp, string quote);

    function addFeedback(string memory _feedback) public {
        feedbacks.push(Feedback({sender: msg.sender, timestamp: block.timestamp, message: _feedback}));

        emit FeedbackAdded(msg.sender, block.timestamp, _feedback);
    }

    function addWisdom(string memory _quote) public {
        require(canAddWisdom(), "You must wait before adding another wisdom");

        wisdomByUser[msg.sender] = Wisdom({sender: msg.sender, timestamp: block.timestamp, quote: _quote});

        emit WisdomAdded(msg.sender, block.timestamp, _quote);
    }

    function canAddWisdom() public view returns (bool) {
        return (block.timestamp >= wisdomByUser[msg.sender].timestamp + WISDOM_COOLDOWN)
            || wisdomByUser[msg.sender].timestamp == 0;
    }

    function timeUntilNextWisdom() public view returns (uint256) {
        if (canAddWisdom()) {
            return 0;
        } else {
            return (wisdomByUser[msg.sender].timestamp + WISDOM_COOLDOWN) - block.timestamp;
        }
    }
}
