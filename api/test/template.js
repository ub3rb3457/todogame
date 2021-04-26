const { chai, server, should } = require("./testConfig");
const TemplateModel = require("../models/TemplateModel");

/**
 * Test cases to test all the template APIs
 * Covered Routes:
 * (1) Login
 * (2) Create records
 * (3) Retrieve all records
 * (4) Retrieve a single record
 * (5) Update a record
 * (6) Delete a record
 */

describe("Template", () => {
	//Before each test we empty the database
	before((done) => { 
		TemplateModel.deleteMany({}, (err) => { 
			done();           
		});        
	});

	// Prepare data for testing
	const userTestData = {
		"password":"Test@123",
		"email":"maitraysuthar@test12345.com"
	};

	// Prepare data for testing
	const testData = {
		"title":"testing template",
		"description":"testing template desc",
		"isbn":"3214htrff4"
	};

	/*
  * Test the /POST route
  */
	describe("/POST Login", () => {
		it("it should do user Login for template", (done) => {
			chai.request(server)
				.post("/api/auth/login")
				.send({"email": userTestData.email,"password": userTestData.password})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Login Success.");
					userTestData.token = res.body.data.token;
					done();
				});
		});
	});

	/*
  * Test the /POST route
  */
	describe("/POST Template Store", () => {
		it("It should send validation error for store template", (done) => {
			chai.request(server)
				.post("/api/template")
				.send()
				.set("Authorization", "Bearer "+ userTestData.token)
				.end((err, res) => {
					res.should.have.status(400);
					done();
				});
		});
	});

	/*
  * Test the /POST route
  */
	describe("/POST Template Store", () => {
		it("It should store template", (done) => {
			chai.request(server)
				.post("/api/template")
				.send(testData)
				.set("Authorization", "Bearer "+ userTestData.token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Template add Success.");
					done();
				});
		});
	});

	/*
  * Test the /GET route
  */
	describe("/GET All template", () => {
		it("it should GET all the templates", (done) => {
			chai.request(server)
				.get("/api/template")
				.set("Authorization", "Bearer "+ userTestData.token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Operation success");
					testData._id = res.body.data[0]._id;
					done();
				});
		});
	});

	/*
  * Test the /GET/:id route
  */
	describe("/GET/:id template", () => {
		it("it should GET the templates", (done) => {
			chai.request(server)
				.get("/api/template/"+testData._id)
				.set("Authorization", "Bearer "+ userTestData.token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Operation success");
					done();
				});
		});
	});

	/*
  * Test the /PUT/:id route
  */
	describe("/PUT/:id template", () => {
		it("it should PUT the templates", (done) => {
			chai.request(server)
				.put("/api/template/"+testData._id)
				.send(testData)
				.set("Authorization", "Bearer "+ userTestData.token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Template update Success.");
					done();
				});
		});
	});

	/*
  * Test the /DELETE/:id route
  */
	describe("/DELETE/:id template", () => {
		it("it should DELETE the templates", (done) => {
			chai.request(server)
				.delete("/api/template/"+testData._id)
				.set("Authorization", "Bearer "+ userTestData.token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Template delete Success.");
					done();
				});
		});
	});
});