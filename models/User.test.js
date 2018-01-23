const test_mongodb = require("./in_memory_mongodb_setup");
beforeAll(test_mongodb.setup);
afterAll(test_mongodb.teardown);

describe("User model", () => {
  const User = require("./User");

  const username = "kevin";
  const email = "kevin@example.com";
  const newEmail = "gordon@example.com";

  let user = new User({ username, email });

  it("can be saved", async () => {
    await user.save();
  });

  it("should have createdAt and updatedAt timestamp after being saved", () => {
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
  });

  it("can be searched by _id", async () => {
    let searchResult = await User.findById(user._id);
    expect(searchResult.username).toEqual(username);
    expect(searchResult.email).toEqual(email);
  });

  it("can be searched by username", async () => {
    let searchResult = await User.findOne({ username });
    expect(searchResult.username).toEqual(username);
    expect(searchResult.email).toEqual(email);
  });

  it("can be searched by email", async () => {
    let searchResult = await User.findOne({ email });
    expect(searchResult.username).toEqual(username);
    expect(searchResult.email).toEqual(email);
  });

  it("can be updated", async () => {
    user.email = newEmail;
    await user.save();
    let searchResult = await User.findById(user._id);
    expect(searchResult.email).toEqual(newEmail);
  });

  it("can be deleted", async () => {
    await user.remove();
    let searchResult = await User.findById(user._id);
    expect(searchResult).toBeNull();
  });
});
