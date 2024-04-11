const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TodoModule", (m) => {
  const lock = m.contract("TodoList");
  return { lock };
});
