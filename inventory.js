import { seq } from './app.js';
import axios from 'axios';

var inventoryId = 1;
async function sendLine(body) {
    let params = {
        url: "https://notify-api.line.me/api/notify",
        method: "POST",
        headers: {
            Authorization: "Bearer " + 'RPoTqpvOSJUE1TPC3I8UqG6r1htyfyvWOEVwr8mzR2q',
            "Content-Type": "application/x-www-form-urlencoded",
            // 'X-Line-Retry-Key': '<UUID>'
            // 'Content-Type': 'multipart/form-data'
        },
        params: {
            message: `${body.title}預算水位警告 目前剩餘庫存：${body.quantity} 包 請與廠商補貨`,
        },
    };

    try {
        await axios(params);
        console.log("line successed ");
        return;
    } catch (err) {
        console.log("err: ", err);
        return;
    }
}
const getInventorys = async (req, res) => {
    const [results, metadata] = await seq.query(`SELECT * from Inventory`);
    console.log('Inventory list: ', results);
    sendLine(results[0]);

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

const postInventory = async (req, res) => {
    console.log('req data: ', req.body);
    try {
        let title = req.body.title;
        let price = req.body.price;
        let quantity = req.body.quantity;
        let orderDate = req.body.orderDate;
        let arrivalDate = req.body.arrivalDate;
        let expirationDate = req.body.expirationDate;

        inventoryId++;
        const [results, metadata] = await seq.query(`INSERT INTO Inventory VALUES ('${inventoryId}', '${title}', '${price}', '${quantity}', '${orderDate}', '${arrivalDate}', '${expirationDate}')`);
        console.log('Inventory list: ', results);
        const response = {
            inventoryId: inventoryId.toString(),
            title: title,
            price: price,
            quantity: quantity,
            orderDate: orderDate,
            arrivalDate: arrivalDate,
            expirationDate: expirationDate,
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

const putInventory = async (req, res) => {
    console.log('req data: ', req.body);
    try {
        let title = req.body.title;
        let price = req.body.price;
        let quantity = req.body.quantity;
        let orderDate = req.body.orderDate;
        let arrivalDate = req.body.arrivalDate;
        let expirationDate = req.body.expirationDate;
        let inventoryId = req.params.inventoryId;

        const [results, metadata] = await seq.query(`UPDATE Inventory SET title = '${title}', price = '${price}', quantity = '${quantity}', orderDate = '${orderDate}', arrivalDate = '${arrivalDate}', expirationDate = '${expirationDate}' WHERE inventoryId = ${inventoryId}`);
        console.log('Inventory list: ', results);
        const response = {
            inventoryId: inventoryId.toString(),
            title: title,
            price: price,
            quantity: quantity,
            orderDate: orderDate,
            arrivalDate: arrivalDate,
            expirationDate: expirationDate,
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
    getInventorys,
    getInventory,
    postInventory,
    putInventory
}