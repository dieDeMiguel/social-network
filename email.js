const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV) {
    secrets = process.env;
} else {
    secrets = require("./config.json");
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1",
});

module.exports = {
    ses,
};
