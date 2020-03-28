if (process.env.REACT_APP_NODE_ENV === "production") {
	module.exports = require("./prod");
} else {
	module.exports = require("./dev");
}
