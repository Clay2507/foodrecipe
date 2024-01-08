
async function fetchData(url) {
    try {
        const request = await fetch(url)
        if (!request.ok) throw Error('No such user found');
        const data = await request.json();
        return data;
    } catch (error) {
        alert(error.message);
    }
}

async function getUser(inputVal) {
    const url = new URL(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputVal}`);
    const user = await fetchData(url);
    return user;
}

export { getUser }