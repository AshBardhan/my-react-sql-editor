function waitFor(time) {
    return new Promise((resolve) => setTimeout(resolve, time * 1000));
};

export async function QueryService(sqlQuery) {
    await waitFor(0.2);
    const randomNumber = Math.random();
    if (randomNumber < 0.01) {
        throw new Error("Mock Fetch: Simulated network error");
    }

    let url = "/data/customers.csv";
    if (sqlQuery.length % 2 === 0) {
        url = "/data/territories.csv";
    }

    // Fetch results from mock files
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Network Error ${url}: Status ${response.status}.`);
        }
        return await response.text();
    } catch (error) {
        throw new Error(`Network Error ${url}: ${error.message}`);
    }
}