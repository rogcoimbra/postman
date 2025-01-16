// Function to capture and save the Auth Token
function captureAuthToken() {
    try {
        // Get the response as JSON
        let responseBody = pm.response.json();

        // Check if id_token is present in the response
        if (responseBody && responseBody.id_token) {
            let authToken = responseBody.id_token;
            pm.environment.set("savedAuthToken", authToken);
            console.log("Auth Token captured and saved:", authToken);
        } else {
            console.warn("id_token not found in the response.");
        }
    } catch (error) {
        console.error("Error capturing the Auth Token:", error);
    }
}

// Execute the function to capture the Auth Token
captureAuthToken();

// Function to capture and save the SAP Token
function captureSAPToken() {
    try {
        // Get the response as JSON
        let responseBody = pm.response.json();

        // Check if the token is present in the response
        if (responseBody && responseBody.token) {
            let sapToken = responseBody.token;
            pm.environment.set("savedSAPToken", sapToken);
            console.log("SAP Token captured and saved:", sapToken);
        } else {
            console.warn("Token not found in the response.");
        }
    } catch (error) {
        console.error("Error capturing the SAP Token:", error);
    }
}

// Execute the function to capture the SAP Token
captureSAPToken();

// Function to capture and save the CSRF Token
function captureCSRFToken() {
    let csrfToken = pm.response.headers.get("x-csrf-token");
    if (csrfToken) {
        pm.environment.set("savedCSRFToken", csrfToken);
        console.log("CSRF Token captured:", csrfToken);
    } else {
        console.warn("CSRF Token not found.");
    }
}

// Execute the function to capture the CSRF Token
captureCSRFToken();

// Function to capture and save the E-Tag
function captureETag() {
    // Get the response as JSON
    let responseBody = pm.response.json();

    // Check if the expected structure is present
    if (responseBody.d && responseBody.d.results && responseBody.d.results[0] && responseBody.d.results[0].__metadata && responseBody.d.results[0].__metadata.etag) {
        let eTag = responseBody.d.results[0].__metadata.etag;
        let cleanedETag = eTag.replace(/\\/g, ""); // Clean backslashes
        pm.environment.set("savedDataEtag", cleanedETag);
        console.log("Cleaned E-Tag:", cleanedETag);
    } else {
        console.warn("E-Tag not found or unexpected response structure.");
    }
}

// Execute the function to capture the E-Tag
captureETag();
