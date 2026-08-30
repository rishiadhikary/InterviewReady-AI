const moongose = require("mongoose");
const blacklistSchema = new moongose.Schema({
    token: {
        type: String,
        required: [true, "Token is required"]
    }
},
{
    timestamps: true
});

const tokenBlacklistModel = moongose.model("TokenBlacklist", blacklistSchema);
module.exports = tokenBlacklistModel;