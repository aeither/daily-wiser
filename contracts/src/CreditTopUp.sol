// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CreditTopUp {
    // Mapping to store user credits
    mapping(address => uint256) public userCredits;

    // Conversion rate: 1 ETH = 10000 credits (now mutable)
    uint256 public creditsPerEth = 10000;

    // Treasury address
    address payable public treasury;

    // Owner address
    address public owner;

    // Event to emit when a user tops up credits
    event CreditsPurchased(address indexed user, uint256 ethPaid, uint256 creditsReceived);

    // Event to emit when the credits per ETH rate is updated
    event CreditsPerEthUpdated(uint256 oldRate, uint256 newRate);

    // Constructor to set the treasury address and owner
    constructor(address payable _treasury) {
        require(_treasury != address(0), "Invalid treasury address");
        treasury = _treasury;
        owner = msg.sender;
    }

    // Modifier to restrict access to owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    // Function to allow users to top up credits
    function topUpCredits() public payable {
        require(msg.value > 0, "Must send some ETH to top up credits");

        // Calculate credits based on the ETH sent
        uint256 creditsToAdd = (msg.value * creditsPerEth) / 1 ether;

        // Add credits to the user's balance
        userCredits[msg.sender] += creditsToAdd;

        // Transfer ETH to treasury
        (bool sent,) = treasury.call{value: msg.value}("");
        require(sent, "Failed to send ETH to treasury");

        // Emit the event
        emit CreditsPurchased(msg.sender, msg.value, creditsToAdd);
    }

    // Function to check user's credit balance
    function checkCredits() public view returns (uint256) {
        return userCredits[msg.sender];
    }

    // Function to update treasury address (only owner can call)
    function updateTreasury(address payable newTreasury) public onlyOwner {
        require(newTreasury != address(0), "Invalid treasury address");
        treasury = newTreasury;
    }

    // Function to update the credits per ETH rate (only owner can call)
    function updateCreditsPerEth(uint256 newRate) public onlyOwner {
        require(newRate > 0, "New rate must be greater than zero");
        uint256 oldRate = creditsPerEth;
        creditsPerEth = newRate;
        emit CreditsPerEthUpdated(oldRate, newRate);
    }

    // Function to transfer ownership (only owner can call)
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid new owner address");
        owner = newOwner;
    }
}
