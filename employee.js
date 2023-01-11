import { seq } from './app.js';

var employeeId = 10;
const getEmployees = async (req, res) => {
    const [results, metadata] = await seq.query(`SELECT * from Employee`);
    console.log('Employee list: ', results);
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

const getEmployee = async (req, res) => {
    let employeeId = req.params.employeeId;
    const [results, metadata] = await seq.query(`SELECT * from Employee WHERE employeeId = '${employeeId}'`);
    console.log('Employee list: ', results);
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

const postEmployee = async (req, res) => {
    console.log('req data: ', req.body);
    try {
        let name = req.body.name;
        let phoneNumber = req.body.phoneNumber;
        let entryDay = req.body.entryDay;
        let position = req.body.position;
        let address = req.body.address;
        let salary = req.body.salary;

        const dateTime = Date.now();
        const timestamp = Math.floor(dateTime / 1000);
        let createTs = timestamp;

        employeeId++;
        const [results, metadata] = await seq.query(`INSERT INTO Employee VALUES ('${employeeId}', '${name}', '${phoneNumber}', '${entryDay}', '${position}', '${createTs}', '${address}', '${salary}')`);
        console.log('Orders list: ', results);
        const response = {
            employeeId: employeeId.toString(),
            name: name,
            phoneNumber: phoneNumber,
            entryDay: entryDay,
            position: position,
            address: address,
            salary: salary,
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

const putEmployee = async (req, res) => {
    console.log('req data: ', req.body);
    try {
        let name = req.body.name;
        let phoneNumber = req.body.phoneNumber;
        let entryDay = req.body.entryDay;
        let position = req.body.position;
        let address = req.body.address;
        let salary = req.body.salary;
        let employeeId = req.params.employeeId;

        const [results, metadata] = await seq.query(`UPDATE Employee SET name = '${name}', phoneNumber = '${phoneNumber}', entryDay = '${entryDay}', position = '${position}', address = '${address}', salary = '${salary}' WHERE employeeId = ${employeeId}`);
        console.log('Employee list: ', results);
        const response = {
            employeeId: employeeId.toString(),
            name: name,
            phoneNumber: phoneNumber,
            entryDay: entryDay,
            position: position,
            address: address,
            salary: salary,
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
    getEmployees,
    getEmployee,
    postEmployee,
    putEmployee
}