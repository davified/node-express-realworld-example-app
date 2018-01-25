const loadFixture = require("mongoose-fixture-loader");
const User = require("../models/User");

const fixtures = {};

async function loadFixtures() {
  const tom = await loadFixture(User, {
    username: "tom",
    email: "tom@example.com"
  });

  fixtures.users = { tom };
}

module.exports = {
  fixtures,
  load: loadFixtures
};
