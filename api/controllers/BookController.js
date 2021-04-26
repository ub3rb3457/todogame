const Book = require("../models/BookModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// Book Schema
function BookData(data) {
	this.id = data._id;
	this.title= data.title;
	this.description = data.description;
	this.isbn = data.isbn;
	this.createdAt = data.createdAt;
}
/**Book List. 
 * @returns {Object}
 */
exports.bookList = [
	auth,
	function (req, res) {
		try {
			Book.find({user: req.user._id},"_id title description isbn createdAt").then((books)=>{
				return (books.length > 0) ? apiResponse.successResponseWithData(res, "Operation success", books) : apiResponse.successResponseWithData(res, "Operation success", []);
			});
		} catch (err) {//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Book Detail.
 * @param {string}      id
 * @returns {Object}
 */
exports.bookDetail = [
	auth,
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)) return apiResponse.successResponseWithData(res, "Operation success", {});
		try {
			Book.findOne({_id: req.params.id,user: req.user._id},"_id title description isbn createdAt").then((book)=>{                
				if(book !== null){
					let bookData = new BookData(book);
					return apiResponse.successResponseWithData(res, "Operation success", bookData);
				} else {
					return apiResponse.successResponseWithData(res, "Operation success", {});
				}
			});
		} catch (err) {//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/** Create Book.
 * @param {string}      title 
 * @param {string}      description
 * @param {string}      isbn
 * @returns {Object}
 */
exports.bookStore = [
	auth, // do some input validation
	body("title", "Title must not be empty.").isLength({ min: 1 }).trim(),
	body("description", "Description must not be empty.").isLength({ min: 1 }).trim(),
	body("isbn", "ISBN must not be empty").isLength({ min: 1 }).trim().custom((value,{req}) => {
		return Book.findOne({ // search for a book with the given isbn belonging to the current user
			isbn : value,
			user: req.user._id
		}).then(book => { // reject duplicate entries
			if (book) return Promise.reject("Book already exist with this ISBN no.");
		});
	}),
	sanitizeBody("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			var book = new Book({ 
				title: req.body.title,
				user: req.user,
				description: req.body.description,
				isbn: req.body.isbn
			});
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				book.save(function (err) {//Save book.
					if (err) return apiResponse.ErrorResponse(res, err); 
					let bookData = new BookData(book);
					return apiResponse.successResponseWithData(res,"Book add Success.", bookData);
				});
			}
		} catch (err) {//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/** Update Book.
 * @param {string}      title 
 * @param {string}      description
 * @param {string}      isbn
 * @returns {Object}
 */
exports.bookUpdate = [
	auth,
	body("title", "Title must not be empty.").isLength({ min: 1 }).trim(),
	body("description", "Description must not be empty.").isLength({ min: 1 }).trim(),
	body("isbn", "ISBN must not be empty").isLength({ min: 1 }).trim().custom((value,{req}) => {
		return Book.findOne({isbn : value,user: req.user._id, _id: { "$ne": req.params.id }}).then(book => {
			if (book) return Promise.reject("Book already exist with this ISBN no.");
		});
	}),
	sanitizeBody("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			var book = new Book({ 
				title: req.body.title,
				description: req.body.description,
				isbn: req.body.isbn,
				_id:req.params.id
			});
			if (!errors.isEmpty()) { // throw a message if we got errors
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else { // if there are no errors
				if(!mongoose.Types.ObjectId.isValid(req.params.id)){ // if the id isn't valid
					return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID"); // throw an error
				}else{ // if it is valid
					Book.findById(req.params.id, function (err, foundBook) { // look for a book with the same id
						if(foundBook === null){ // if you dont find it :
							return apiResponse.notFoundResponse(res,"No Book exists with this id"); 
						}else{ // if you do find it :
							if(foundBook.user.toString() !== req.user._id){// if the user doesn't have access:
								return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
							}else{  // if the user does have access
								Book.findByIdAndUpdate(req.params.id, book, {},function (err) { //update book.
									if (err) { // something went wrong 
										return apiResponse.ErrorResponse(res, err); 
									}else{ // everything is alright
										let bookData = new BookData(book); // 
										return apiResponse.successResponseWithData(res,"Book update Success.", bookData);
									}
								});
							}
						}
					});
				}
			}
		} catch (err) { //throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/** Delete Book.
 * @param {string}      id
 * @returns {Object}
 */
exports.bookDelete = [
	auth,
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)) return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
		try {
			Book.findById(req.params.id, function (err, foundBook) {
				if(foundBook === null){
					return apiResponse.notFoundResponse(res,"Book not exists with this id");
				}else{ //Check authorized user
					if(foundBook.user.toString() !== req.user._id){
						return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
					}else{ //delete book.
						Book.findByIdAndRemove(req.params.id,function (err) {
							return (err) ? apiResponse.ErrorResponse(res, err) : apiResponse.successResponse(res,"Book delete Success.");	
						});
					}
				}
			});
		} catch (err) { //throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];