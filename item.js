import { seq } from './app.js';

var id = 33;
const getItems = async (req, res) => {
    let itemId = req.params.itemId;
    const [results, metadata] = await seq.query(`SELECT * from Items`);
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

const postItem = async (req, res) => {
    console.log('req data: ', req.body);
    try {
        let itemId = req.body.itemId;
        let title = req.body.title;
        let price = req.body.price;
        let quantity = req.body.quantity;

        id++;
        const [results, metadata] = await seq.query(`INSERT INTO Items VALUES (${id}, ${itemId}, '${title}', ${price}, ${quantity})`);
        console.log('Orders list: ', results);
        const response = {
            itemId: itemId.toString(),
            title: title,
            price: price,
            quantity: quantity,
            message: 'OK'
        }

        res.json(response)
        res.status(200)
    } catch (error) {
        console.log(error);
        console.log("ERROR!!");
        res.send(error);
    }
};

export {
    getItems,
    getItem,
    postItem
}