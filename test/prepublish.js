const fs = require("fs-extra"),
  assert = require("assert"),
  path = require("path");

const { name, author, repository, description } = require(path.join(
  __dirname,
  "..",
  "package.json"
));

assert(
  name !== "windy-plugin-example",
  "Please modify name in your package.json, it is still default name \u0007"
);

assert(
  /windy-plugin-\S+/.test(name),
  "Name of your plugin MUST have form windy-plugin-XXXX. Please modify name in your package.json. \u0007"
);

assert(
  !/default desc/.test(description),
  "Please modify description in your package.json, it is still default description \u0007"
);

assert(
  author !== "Windyty, S.E.",
  "Please modify author in your package.json, it is still default author \u0007"
);

assert(
  repository && !/windycom/.test(repository.url),
  "Please modify repository in your package.json, it is still default repository \u0007"
);

const readme = fs.readFileSync(path.join(__dirname, "..", "README.md"), "utf8");

assert(readme, "README.md file missing\u0007");

assert(
  !/This is default readme/.test(readme),
  "The README.md file is still default, please delete it and put there info about your plugin \u0007"
);
