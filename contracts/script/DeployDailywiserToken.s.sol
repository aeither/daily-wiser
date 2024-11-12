// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/DailywiserToken.sol";

contract DeployDailywiserToken is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);

        DailywiserToken token = new DailywiserToken(deployerAddress);

        console.log("DailywiserToken token deployed at:", address(token));

        vm.stopBroadcast();
    }
}
