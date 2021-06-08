export default class Upload {
    static async uploadData(url) {
        return await fetch(url)
            .then(res => res.json())
            .then(json => JSON.stringify(json))
            .then(obj => JSON.parse(obj))
            // .then(obj => dataStorage = obj);
        }
}