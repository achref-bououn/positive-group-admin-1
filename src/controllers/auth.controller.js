const Admin = require("../models/admin");
const User = require("../models/user");
const repository = require("../repositories/base.repository");
const bcrypt = require("bcrypt");

module.exports = {

    adminLogin: async (req, res) => {
        try {
            const admin = await repository.findOne({ email: req.body.email }, Admin);
            if (admin.password === req.body.password) {
                res.send({
                    message: "SUCCESS!",
                });
            } else {
                res.send({
                    message: "WRONG PASSWORD",
                });
            }
        }
        catch (e) {
            res.status(400).json({
                error: error,
            });
        }
    },

    userLogin: async (req, res) => {
        try {
            const user = await repository.findOne({ email: req.body.email }, User);
            if (await bcrypt.compare(user.password, req.body.password)) {
                res.status(200).send({
                    message: "SUCCESS!",
                });
            } else {
                res.status(405).send({
                    message: "WRONG PASSWORD",
                });
            }
        }
        catch (e) {
            res.status(400).json({
                error: error,
            });
        }
    },

    signup: async (req, res) => {
        try {
            let userData = req.body;
            userData.password = await bcrypt.hash(userData.password, 10);
            const user = repository.save(user, User);
            res.status(201).send({ message: "Created!" })
        }
        catch (e) {
            console.error(e)
            res.status(500).send()
        }
    }
}