// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/Certificate.sol";

contract DeployCertificate is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        // NFT Collection Parameters
        string memory name = "Certificate Collection";
        string memory symbol = "CERT";

        vm.startBroadcast(deployerPrivateKey);

        Certificate certificate = new Certificate(
            name,
            symbol,
            deployer // initialOwner
        );

        vm.stopBroadcast();

        console.log("Certificate NFT deployed at:", address(certificate));
        console.log("Owner set to deployer's address:", deployer);
        console.log("Collection Name:", name);
        console.log("Collection Symbol:", symbol);
    }
}