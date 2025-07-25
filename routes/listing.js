const express = require("express");
const router = express.Router();
exports.router = router;
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })  // upload destination

// Index and Create route 
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image][url]'), validateListing, wrapAsync(listingController.createListing));

//New route
router.get("/new", isLoggedIn, listingController.renderNewForm);
    
// Show, Update, and Delete route
router.route("/:id")
    .get(wrapAsync(listingController.showListings))
    .put(isLoggedIn, isOwner, upload.single('listing[image][url]'), validateListing, wrapAsync(listingController.updateListing))
    .delete( isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;