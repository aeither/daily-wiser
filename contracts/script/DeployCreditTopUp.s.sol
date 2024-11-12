// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/CreditTopUp.sol";

contract DeployCreditTopUp is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Derive the deployer's address from the private key
        address payable treasury = payable(vm.addr(deployerPrivateKey));

        vm.startBroadcast(deployerPrivateKey);

        CreditTopUp creditTopUp = new CreditTopUp(treasury);

        vm.stopBroadcast();

        console.log("CreditTopUp deployed at:", address(creditTopUp));
        console.log("Treasury address set to deployer's address:", treasury);
    }
}
