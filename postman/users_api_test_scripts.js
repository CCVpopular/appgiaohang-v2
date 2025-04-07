// Test scripts for Users API

// Get All Users test script
const getAllUsersTests = () => {
    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });
    
    pm.test("Response has users array", function () {
        const jsonData = pm.response.json();
        pm.expect(jsonData).to.have.property('users');
        pm.expect(jsonData.users).to.be.an('array');
    });
    
    pm.test("User objects have expected properties", function () {
        const jsonData = pm.response.json();
        if (jsonData.users.length > 0) {
            const user = jsonData.users[0];
            pm.expect(user).to.have.property('id');
            pm.expect(user).to.have.property('email');
            pm.expect(user).to.have.property('full_name');
            pm.expect(user).to.have.property('phone_number');
            pm.expect(user).to.have.property('role');
            pm.expect(user).to.have.property('is_active');
        }
    });
};

// Create User test script
const createUserTests = () => {
    pm.test("Status code is 201", function () {
        pm.response.to.have.status(201);
    });
    
    pm.test("Response has expected message", function () {
        const jsonData = pm.response.json();
        pm.expect(jsonData).to.have.property('message');
        pm.expect(jsonData.message).to.eql('User created successfully');
    });
    
    pm.test("Response has userId", function () {
        const jsonData = pm.response.json();
        pm.expect(jsonData).to.have.property('userId');
        
        // Store the user ID for future tests
        if (jsonData.userId) {
            pm.environment.set('userId', jsonData.userId);
        }
    });
};

// Update User test script
const updateUserTests = () => {
    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });
    
    pm.test("Response has expected message", function () {
        const jsonData = pm.response.json();
        pm.expect(jsonData).to.have.property('message');
        pm.expect(jsonData.message).to.eql('User updated successfully');
    });
};

// Update User Active Status test script
const updateUserActiveStatusTests = () => {
    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });
    
    pm.test("Response has expected message", function () {
        const jsonData = pm.response.json();
        pm.expect(jsonData).to.have.property('message');
        pm.expect(jsonData.message).to.eql('User active status updated successfully');
    });
};

// Error handling tests for all endpoints
const errorTests = () => {
    pm.test("Error responses have correct format", function () {
        if (pm.response.code >= 400) {
            const jsonData = pm.response.json();
            pm.expect(jsonData).to.have.property('error');
        }
    });
};

// Export the test functions
if (typeof module !== 'undefined') {
    module.exports = {
        getAllUsersTests,
        createUserTests,
        updateUserTests,
        updateUserActiveStatusTests,
        errorTests
    };
} 