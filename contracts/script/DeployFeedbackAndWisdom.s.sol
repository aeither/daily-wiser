// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/FeedbackAndWisdom.sol";

contract DeployFeedbackAndWisdom is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);
        FeedbackAndWisdom feedbackContract = new FeedbackAndWisdom();
        vm.stopBroadcast();
        console.log("Deployment address:", address(feedbackContract));
    }
}
