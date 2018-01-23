const test_mongodb = require("./in_memory_mongodb_setup");
const ValidationError = require("mongoose").ValidationError;

beforeAll(test_mongodb.setup);
afterAll(test_mongodb.teardown);

const User = require("./User");

describe("User model", () => {
  const username = "kevin";
  const email = "kevin@example.com";
  const newEmail = "gordon@example.com";

  let user = new User({ username, email });

  it("can be saved", async () => {
    await expect(user.save()).resolves.toBe(user);
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

describe("Unique fields in User model", () => {
  const username1 = "kevin";
  const email1 = "kevin@example.com";

  const username2 = "gordon";
  const email2 = "gordon@example.com";

  let user1 = new User({ username: username1, email: email1 });

  beforeEach(async () => await user1.save());

  it("should not allow two users with the same name", async () => {
    let userWithSameName = new User({ username: username1, email: email2 });
    await expect(userWithSameName.save()).rejects.toThrow(ValidationError);
  });

  it("should not allow two users with the email", async () => {
    let userWithSameEmail = new User({ username: username2, email: email1 });
    await expect(userWithSameEmail.save()).rejects.toThrow(ValidationError);
  });

  it("should allow to create another user with unique name and email", async () => {
    let uniqueUser = new User({ username: username2, email: email2 });
    await expect(uniqueUser.save()).resolves.toBe(uniqueUser);
  });
});
