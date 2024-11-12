// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/DailywiserToken.sol";

contract DailywiserTokenTest is Test {
    DailywiserToken public token;
    address public owner;
    address public user1;
    address public user2;

    event Transfer(address indexed from, address indexed to, uint256 value);

    function setUp() public {
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);
        token = new DailywiserToken(owner);
    }

    function testMintAndCheckEvent() public {
        uint256 amount = 1000 * 10 ** 18; // 1000 tokens
        vm.expectEmit(true, true, false, true);
        emit Transfer(address(0), user1, amount);
        token.mint(user1, amount);
        assertEq(token.balanceOf(user1), amount);
    }

    function testBurnAndCheckEvent() public {
        uint256 mintAmount = 1000 * 10 ** 18;
        uint256 burnAmount = 500 * 10 ** 18;
        token.mint(user1, mintAmount);

        vm.prank(user1);
        vm.expectEmit(true, true, false, true);
        emit Transfer(user1, address(0), burnAmount);
        token.burn(burnAmount);

        assertEq(token.balanceOf(user1), mintAmount - burnAmount);
    }

    function testOnlyOwnerCanMint() public {
        vm.prank(user1);
        vm.expectRevert(abi.encodeWithSignature("OwnableUnauthorizedAccount(address)", user1));
        token.mint(user1, 1000 * 10 ** 18);
    }

    function testPauseAndUnpause() public {
        token.pause();
        assertTrue(token.paused());

        vm.expectRevert(abi.encodeWithSignature("EnforcedPause()"));
        token.transfer(user1, 100);

        token.unpause();
        assertFalse(token.paused());

        token.mint(owner, 100);
        token.transfer(user1, 100);
        assertEq(token.balanceOf(user1), 100);
    }

    function testNonOwnerCannotPauseOrUnpause() public {
        vm.prank(user1);
        vm.expectRevert(abi.encodeWithSignature("OwnableUnauthorizedAccount(address)", user1));
        token.pause();

        vm.prank(user1);
        vm.expectRevert(abi.encodeWithSignature("OwnableUnauthorizedAccount(address)", user1));
        token.unpause();
    }

    function testCannotTransferMoreThanBalance() public {
        token.mint(user1, 100);
        vm.prank(user1);
        vm.expectRevert(abi.encodeWithSignature("ERC20InsufficientBalance(address,uint256,uint256)", user1, 100, 101));
        token.transfer(user2, 101);
    }

    function testCannotBurnMoreThanBalance() public {
        token.mint(user1, 100);
        vm.prank(user1);
        vm.expectRevert(abi.encodeWithSignature("ERC20InsufficientBalance(address,uint256,uint256)", user1, 100, 101));
        token.burn(101);
    }

    function testTotalSupplyTracking() public {
        uint256 initialSupply = token.totalSupply();
        uint256 mintAmount = 1000 * 10 ** 18;
        token.mint(user1, mintAmount);
        assertEq(token.totalSupply(), initialSupply + mintAmount);

        vm.prank(user1);
        token.burn(mintAmount / 2);
        assertEq(token.totalSupply(), initialSupply + mintAmount / 2);
    }

    function testTransferFromWithAllowance() public {
        uint256 amount = 1000 * 10 ** 18;
        token.mint(user1, amount);

        vm.prank(user1);
        token.approve(user2, amount / 2);

        vm.prank(user2);
        token.transferFrom(user1, user2, amount / 2);

        assertEq(token.balanceOf(user1), amount / 2);
        assertEq(token.balanceOf(user2), amount / 2);
    }

    function testCannotTransferFromWithoutAllowance() public {
        uint256 amount = 1000 * 10 ** 18;
        token.mint(user1, amount);

        vm.prank(user2);
        vm.expectRevert(
            abi.encodeWithSignature("ERC20InsufficientAllowance(address,uint256,uint256)", user2, 0, amount)
        );
        token.transferFrom(user1, user2, amount);
    }
}
