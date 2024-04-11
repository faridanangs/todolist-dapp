// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract TodoList {
    enum Status {
        pending,
        success
    }
    struct List {
        string text;
        Status status;
        uint256 time;
    }

    List[] internal lists;

    function addTodo(string calldata _text) public {
        lists.push(
            List({text: _text, status: Status.pending, time: block.timestamp})
        );
    }

    function getList() public view returns (List[] memory) {
        return lists;
    }
}
