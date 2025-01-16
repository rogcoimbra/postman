// Função para capturar e salvar o Auth Token
function captureAuthToken() {
    try {
        // Obter a resposta como JSON
        let responseBody = pm.response.json();

        // Verificar se o id_token está presente na resposta
        if (responseBody && responseBody.id_token) {
            let authToken = responseBody.id_token;
            pm.environment.set("savedAuthToken", authToken);
            console.log("Auth Token capturado e salvo:", authToken);
        } else {
            console.warn("id_token não encontrado na resposta.");
        }
    } catch (error) {
        console.error("Erro ao capturar o Auth Token:", error);
    }
}

// Executar a função para capturar o Auth Token
captureAuthToken();


// Função para capturar e salvar o SAP Token
function captureSAPToken() {
    try {
        // Obter a resposta como JSON
        let responseBody = pm.response.json();

        // Verificar se o token está presente na resposta
        if (responseBody && responseBody.token) {
            let sapToken = responseBody.token;
            pm.environment.set("savedSAPToken", sapToken);
            console.log("SAP Token capturado e salvo:", sapToken);
        } else {
            console.warn("Token não encontrado na resposta.");
        }
    } catch (error) {
        console.error("Erro ao capturar o SAP Token:", error);
    }
}

// Executar a função para capturar o SAP Token
captureSAPToken();

// Função para capturar e salvar o CSRF Token
function captureCSRFToken() {
    let csrfToken = pm.response.headers.get("x-csrf-token");
    if (csrfToken) {
        pm.environment.set("savedCSRFToken", csrfToken);
        console.log("CSRF Token capturado:", csrfToken);
    } else {
        console.warn("CSRF Token não encontrado.");
    }
}

// Executar a função para capturar o CSRF Token
captureCSRFToken();

// Função para capturar e salvar o E-Tag
function captureETag() {
    // Obter a resposta como JSON
    let responseBody = pm.response.json();

    // Verificar se a estrutura esperada está presente
    if (responseBody.d && responseBody.d.results && responseBody.d.results[0] && responseBody.d.results[0].__metadata && responseBody.d.results[0].__metadata.etag) {
        let eTag = responseBody.d.results[0].__metadata.etag;
        let cleanedETag = eTag.replace(/\\/g, ""); // Limpar barras invertidas
        pm.environment.set("savedDataEtag", cleanedETag);
        console.log("E-Tag limpo:", cleanedETag);
    } else {
        console.warn("E-Tag não encontrado ou estrutura de resposta inesperada.");
    }
}

// Executar a função para capturar o E-tag
captureETag();
