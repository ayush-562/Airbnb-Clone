const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListings = async (req, res) => {
    let { id } = req.params;
    // use populate nesting to populate author.
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for doesn't exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
    // let {title, description, image, price, location, country} = req.body;
    // let listing = req.body.listing; 
    // inserting this one data
    // then used try catch block and added next
    // try{
    //     const newListing = new Listing(req.body.listing); 
    //     await newListing.save();
    //     res.redirect("/listings");
    // } catch(err){
    //     next(err);
    // }
    // then used wrapAsync function
    // if(!req.body.listing){          // if listing doesn't exists == body is empty
    //     throw new ExpressError(400,"Send valid data for listing");  //bad request = client's mistake
    // }
    // above if is replaced with joi validation

    // ****** For Geocoding ******
    let response = await geocodingClient
        .forwardGeocode({                          // using forwardGeocode method 
            query: req.body.listing.location,      // listing location is passed in a query
            limit: 1,                              // location can contain range of coordinates, we want any one coordinate
        })
        .send();
    // console.log(response.body.features);
    // res.send("done!");
    // response object contains a lot of info, features array contains number of results, we limited to 1.
    // coordinates will be in response.body.features[0].geometry

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;   // assign owner
    newListing.image = { url, filename };

    newListing.geometry = response.body.features[0].geometry;   // storing coordinates

    let savedLisitng = await newListing.save();
    console.log(savedLisitng);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for doesn't exist!");
        res.redirect("/listings");
    }
    // preview of image in edit form (decreased size)
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    // data from req.body has to be deconstructed
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    let response = await geocodingClient
    .forwardGeocode({                          // using forwardGeocode method 
        query: req.body.listing.location,      // listing location is passed in a query
        limit: 1,                              // location can contain range of coordinates, we want any one coordinate
    })
    .send();

    listing.geometry = response.body.features[0].geometry;   // storing coordinates
    await listing.save();

    // for updating image (if new provided)
    if (typeof req.file !== "undefined") {  //empty req.file --> undefined
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);  // will also call post mongoose middleware
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};