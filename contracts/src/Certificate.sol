// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Certificate is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor(string memory name, string memory symbol, address initialOwner)
        ERC721(name, symbol)
        Ownable(initialOwner)
    {
        _nextTokenId = 0;
    }

    function mint(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);

        return tokenId;
    }
}
