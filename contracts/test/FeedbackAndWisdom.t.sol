// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/FeedbackAndWisdom.sol";

contract FeedbackAndWisdomTest is Test {
    FeedbackAndWisdom public feedbackAndWisdom;
    address public user1 = address(1);
    address public user2 = address(2);

    event FeedbackAdded(address indexed sender, uint256 timestamp, string message);
    event WisdomAdded(address indexed sender, uint256 timestamp, string quote);

    function setUp() public {
        feedbackAndWisdom = new FeedbackAndWisdom();
    }

    function testAddFeedback() public {
        vm.prank(user1);
        feedbackAndWisdom.addFeedback("Great contract!");

        (address sender, uint256 timestamp, string memory message) = feedbackAndWisdom.feedbacks(0);
        assertEq(sender, user1);
        assertEq(message, "Great contract!");
    }

    function testAddFeedbackEmitsEvent() public {
        vm.prank(user1);
        vm.expectEmit(true, true, false, true);
        emit FeedbackAdded(user1, block.timestamp, "Event test");
        feedbackAndWisdom.addFeedback("Event test");
    }

    function testAddWisdom() public {
        vm.warp(1); // Set initial time
        vm.prank(user1);
        feedbackAndWisdom.addWisdom("Stay curious");

        (address sender, uint256 timestamp, string memory quote) = feedbackAndWisdom.wisdomByUser(user1);
        assertEq(sender, user1);
        assertEq(quote, "Stay curious");
    }

    function testAddWisdomEmitsEvent() public {
        vm.warp(1);
        vm.prank(user1);
        vm.expectEmit(true, true, false, true);
        emit WisdomAdded(user1, 1, "Event wisdom test");
        feedbackAndWisdom.addWisdom("Event wisdom test");
    }

    function testCannotAddWisdomBeforeCooldown() public {
        vm.warp(1);
        vm.startPrank(user1);
        feedbackAndWisdom.addWisdom("First wisdom");

        vm.expectRevert("You must wait before adding another wisdom");
        feedbackAndWisdom.addWisdom("Second wisdom");
        vm.stopPrank();
    }

    function testCanAddWisdomAfterCooldown() public {
        vm.warp(1);
        vm.startPrank(user1);
        feedbackAndWisdom.addWisdom("First wisdom");

        // Warp time by 20 hours + 1 second
        vm.warp(1 + 20 hours + 1);

        // This should now succeed
        feedbackAndWisdom.addWisdom("Second wisdom");
        vm.stopPrank();

        (,, string memory quote) = feedbackAndWisdom.wisdomByUser(user1);
        assertEq(quote, "Second wisdom");
    }

    function testCanAddWisdom() public {
        vm.warp(1);
        vm.prank(user1);
        assertTrue(feedbackAndWisdom.canAddWisdom());

        vm.prank(user1);
        feedbackAndWisdom.addWisdom("Test wisdom");

        vm.prank(user1);
        assertFalse(feedbackAndWisdom.canAddWisdom());

        // Warp time to after cooldown
        vm.warp(1 + 20 hours + 1);
        vm.prank(user1);
        assertTrue(feedbackAndWisdom.canAddWisdom());
    }

    function testTimeUntilNextWisdom() public {
        vm.warp(1);
        vm.prank(user1);
        assertEq(feedbackAndWisdom.timeUntilNextWisdom(), 0);

        vm.prank(user1);
        feedbackAndWisdom.addWisdom("Test wisdom");

        vm.prank(user1);
        assertEq(feedbackAndWisdom.timeUntilNextWisdom(), 20 hours);

        // Warp time by 10 hours
        vm.warp(1 + 10 hours);

        vm.prank(user1);
        assertEq(feedbackAndWisdom.timeUntilNextWisdom(), 10 hours);
    }

    function testMultipleUsersCanAddWisdom() public {
        vm.warp(1);
        vm.prank(user1);
        feedbackAndWisdom.addWisdom("User1 wisdom");

        vm.prank(user2);
        feedbackAndWisdom.addWisdom("User2 wisdom");

        (,, string memory quote1) = feedbackAndWisdom.wisdomByUser(user1);
        (,, string memory quote2) = feedbackAndWisdom.wisdomByUser(user2);

        assertEq(quote1, "User1 wisdom");
        assertEq(quote2, "User2 wisdom");
    }
}
