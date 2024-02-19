// Import the required modules
const express = require("express")
const router = express.Router()
const User = require("../models/user");



// create user and validating details
router.post("/users", async function (req, res) {
    try {
        const { name, email, age } = req.body;

        // checking all fields
        if (
            !name ||
            !email ||
            !age
        ) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            })
        }

        const existingUser = await User.findOne({ email });


        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email id",
            })
        }


        const user = await User.create({
            name,
            email,
            age
        });
        return res.status(200).json({
            success: true,
            user,
            message: "User created successfully",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while creating user",
            error: error.message,
        });
    }
});


// get all users
router.get("/users", async function (req, res) {
    try {
        const users = await User.find();
        return res.status(200).json({
            success: true,
            users,
            message: "all users",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching all user details",
            error: error.message,
        });
    }
});

//get user by id
router.get("/users/:id", async function (req, res) {
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json({
            success: true,
            user,
            message: "user detail",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching user details by id",
            error: error.message,
        });
    }
});

//update user by id
router.put("/users/:id", async function (req, res) {
    try {
        const id = req.params.id;

        const user = await User.findOneAndUpdate({ _id: id }, req.body, { new: true });
        return res.status(200).json({
            success: true,
            user,
            message: "user detail change",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error accour while updating user",
            error: error.message,
        });
    }
});


// delete a user using id
router.delete("/users/:id", async function (req, res) {
    try {
        const id = req.params.id;
        const user1 = await User.findById(req.params.id);
        if (!user1) {
            return res.status(200).json({
                success: false,
                message: "user doesn't exist",
            });
        }
        const user2 = await User.deleteOne({ _id: id });
        return res.status(200).json({
            success: true,
            user: user1,
            message: "user deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error accour while deleting the user",
            error: error.message,
        });
    }
})


//exporting the router
module.exports = router
