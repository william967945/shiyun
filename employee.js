import { seq } from './app.js';

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

export {
    getEmployees,
    getEmployee
}