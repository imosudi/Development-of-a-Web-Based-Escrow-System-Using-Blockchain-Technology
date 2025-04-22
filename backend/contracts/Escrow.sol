// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Escrow {
    enum State { Initiated, Funded, Confirmed, Released, Disputed, Resolved }
    State public state;

    address public buyer;
    address public seller;
    address public agent;
    uint256 public amount;

    event Initiated(address indexed buyer, address indexed seller, uint256 amount);
    event Funded(address indexed buyer, uint256 amount);
    event Confirmed(address indexed seller);
    event Released(address indexed seller, uint256 amount);
    event Disputed(address indexed by);
    event Resolved(address indexed resolver, address recipient, uint256 amount);
    event Refunded(address indexed buyer, uint256 amount);

    modifier onlyBuyer() { require(msg.sender == buyer, "Not buyer"); _; }
    modifier onlySeller() { require(msg.sender == seller, "Not seller"); _; }
    modifier onlyAgent() { require(msg.sender == agent, "Not agent"); _; }
    modifier inState(State expected) { require(state == expected, "Invalid state"); _; }

    constructor(address _seller, address _agent) payable {
        buyer = msg.sender;
        seller = _seller;
        agent = _agent;
        state = State.Initiated;
        emit Initiated(buyer, seller, msg.value);
    }

    function fund() external payable onlyBuyer inState(State.Initiated) {
        require(msg.value > 0, "No funds sent");
        amount = msg.value;
        state = State.Funded;
        emit Funded(msg.sender, msg.value);
    }

    function confirmDelivery() external onlySeller inState(State.Funded) {
        state = State.Confirmed;
        emit Confirmed(msg.sender);
    }

    function release() external inState(State.Confirmed) {
        require(msg.sender == buyer || msg.sender == agent, "Not authorized");
        state = State.Released;
        payable(seller).transfer(amount);
        emit Released(seller, amount);
    }

    function dispute() external inState(State.Funded) {
        require(msg.sender == buyer || msg.sender == seller, "Not authorized");
        state = State.Disputed;
        emit Disputed(msg.sender);
    }

    function resolve(address recipient) external onlyAgent inState(State.Disputed) {
        require(recipient == buyer || recipient == seller, "Invalid recipient");
        state = State.Resolved;
        payable(recipient).transfer(amount);
        emit Resolved(msg.sender, recipient, amount);
    }

    function refund() external onlyAgent inState(State.Funded) {
        state = State.Resolved;
        payable(buyer).transfer(amount);
        emit Refunded(buyer, amount);
    }
}
