import { seq } from './app.js';

var customerId = 10;
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

const postCustomer = async (req, res) => {
    console.log('req data: ', req.body);
    try {
        let name = req.body.name;
        let age = req.body.age;
        let gender = req.body.gender;
        let phoneNumber = req.body.phoneNumber;

        const dateTime = Date.now();
        const timestamp = Math.floor(dateTime / 1000);
        let createTs = timestamp;

        customerId++;
        const [results, metadata] = await seq.query(`INSERT INTO Customer VALUES ('${customerId}', '${name}', '${age}', '${gender}', '${phoneNumber}', '${createTs}', '')`);
        console.log('Orders list: ', results);
        const response = {
            customerId: customerId.toString(),
            name: name,
            age: age,
            gender: gender,
            phoneNumber: phoneNumber,
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

const putCustomer = async (req, res) => {
    console.log('req data: ', req.body);
    try {
        let name = req.body.name;
        let age = req.body.age;
        let gender = req.body.gender;
        let phoneNumber = req.body.phoneNumber;
        let customerId = req.params.customerId;

        const [results, metadata] = await seq.query(`UPDATE Customer SET name = '${name}', age = ${age}, gender = '${gender}', phoneNumber = '${phoneNumber}' WHERE customerId = ${customerId}`);
        console.log('Customer list: ', results);
        const response = {
            customerId: customerId.toString(),
            name: name,
            age: age,
            gender: gender,
            phoneNumber: phoneNumber,
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

const deleteCustomer = async (req, res) => {
    let customerId = req.params.customerId;

    console.log('req data: ', req.body);
    try {
        const [results, metadata] = await seq.query(`DELETE FROM Customer WHERE CustomerId = '${customerId}'`);
        console.log('Customer list: ', results);
        const response = {
            customerId: customerId.toString(),
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
    getCustomers,
    getCustomer,
    postCustomer,
    putCustomer,
    deleteCustomer
}