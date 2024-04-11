const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Todolist testing", function () {
  const deployTodoLists = async () => {
    const [owner] = await ethers.getSigners();
    const Todolist = await ethers.getContractFactory("TodoList");
    const todolist = await Todolist.deploy();

    return { todolist, owner };
  }
  it("Add todo", async () => {
    const {todolist} = await loadFixture(deployTodoLists);

    await todolist.addTodo("makan");
    
    expect(await todolist.addTodo("makan"));
    
    
    // const data = await todolist.getLists()
    // console.log(data[0][2]);
  })
  it("change status", async () => {
    const {todolist} = await loadFixture(deployTodoLists);
    await todolist.addTodo("makan");
    await todolist.changeStatus(0);
    
    const data = await todolist.getLists();
    expect(data[0][1]).to.equal(1n);
  })
  it("get lists", async () => {
    const {todolist} = await loadFixture(deployTodoLists);
    
    await todolist.addTodo("makan");
    const data = await todolist.getLists();

    expect(data[0][0]).to.equal("makan");
  })
});
