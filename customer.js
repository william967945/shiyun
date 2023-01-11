import { seq } from './app.js';

const getCustomers = async (req, res) => {
    const [results, metadata] = await seq.query(`SELECT * from Customer`);
    console.log('Customer list: ', results);
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

const getCustomer = async (req, res) => {
    let customerId = req.params.customerId;
    const [results, metadata] = await seq.query(`SELECT * from Customer WHERE customerId = '${customerId}'`);
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
    getCustomers,
    getCustomer
}