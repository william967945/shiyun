import { seq } from './app.js';

const getInventorys = async (req, res) => {
    const [results, metadata] = await seq.query(`SELECT * from Inventory`);
    console.log('Inventory list: ', results);
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

const getInventory = async (req, res) => {
    let inventoryId = req.params.inventoryId;
    const [results, metadata] = await seq.query(`SELECT * from Inventory WHERE inventoryId = '${inventoryId}'`);
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
    getInventorys,
    getInventory
}