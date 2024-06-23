const supertest = require('supertest');
const { app } = require('./server.js');

const request = supertest(app);

let selections = [];
let fugitiveLocation = "";

describe('getSelections', () => {
    beforeEach(() => {
        selections = []
    });

    it('should return an empty array if no selections exist', async () => {
        selections = []

        // Send GET request to getSelections endpoint
        const response = await request.get('/selections');

        // Check response status and empty array
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(0);
    });
});

describe('postSelections', () => {
    beforeEach(() => {
        // Reset selections for each test
        selections = [];
    });

    it('should add a valid selection', async () => {
        // Create a valid selection object
        const validSelection = { cop: 'Cop1', city: 'Nuravgram', vehicle: 'EV Car', img_url: 'http://example.com/image1.jpg' };

        // Send POST request to add the selection
        const response = await request.post('/selections').send(validSelection);

        // Check response status and success property
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    // Add more test cases for other scenarios
});

describe('getResult', () => {
    beforeEach(() => {
        // Populate selections for testing getResult
        selections = [
            { cop: 'Cop1', city: 'City31', vehicle: 'EV Car', img_url: 'http://example.com/image1.jpg' },
            { cop: 'Cop2', city: 'City3', vehicle: 'EV Bike', img_url: 'http://example.com/image2.jpg' },
        ];
    })

    it('should return false if fugitive is not captured', async () => {

        // Send GET request to getResult endpoint
        const response = await request.get('/result');

        // Check response status, success property, and message content
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toContain('The fugitive was not captured.');
    });

});





describe('resetResult', () => {
    beforeEach(() => {
        selections = [
            { cop: 'Cop1', city: 'Nuravgram', vehicle: 'EV Car', img_url: 'http://example.com/image1.jpg' },
            { cop: 'Cop2', city: 'Shekharvati', vehicle: 'EV Bike', img_url: 'http://example.com/image2.jpg' },
        ];
    });

    it('should reset the result if selections exist', async () => {
        const response = await request.get('/reset');

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(selections.length).toBe(2);
    });

    it('should reset the result if no selections exist', async () => {
        // Clear selections for testing resetResult when no selections exist
        selections = [];

        const response = await request.get('/reset');

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(selections.length).toBe(0);
    });
});
