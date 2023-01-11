import { seq } from './app.js';

const getItem = async (req, res) => {
    let itemId = req.params.itemId;
    const [results, metadata] = await seq.query(`SELECT * from Items WHERE itemId = '${itemId}'`);
    console.log('Orders list: ', results);
    const response = {
        result: results,
        message: 'OK'
    }
    try {
        res.json(response)
        res.status(200)
    } catch (error) {
        console.log(error);
        console.log("ERROR!!");
        res.send(error);
    }
};

export {
    getItem
}