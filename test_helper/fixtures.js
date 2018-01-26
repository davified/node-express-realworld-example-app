const loadFixture = require("mongoose-fixture-loader");
const User = require("../models/User");

const fixtures = {};

function getNewUser(username, email, password) {
  const user = new User({
    username,
    email
  });
  user.setPassword(password);

  return user;
}

async function loadFixtures() {
  const password = "mypassword";
  const tom = await loadFixture(
    User,
    getNewUser("tom", "tom@example.com", password)
  );
  // store the plaintext password for the test cases to simulate login
  // this is not stored in database
  tom.password = password;

  fixtures.users = { tom };
}

module.exports = {
  fixtures,
  load: loadFixtures
};
