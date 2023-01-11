import { Router } from 'express';
import { seq } from './app.js';

var router = Router();


router.get('/healthcheck', function (req, res) {
    let time = new Date();
    let message = 'OK';
    const healthcheck = {
        time: new Date(),
        message: 'OK'
    }
    try {
        res.json(healthcheck)
    } catch (e) {
        res.status(503).send()
    }
    console.log('healthcheck: ', time, message);
})

router.get('/employee', async function (req,res) {
    const [results, metadata] = await seq.query("SELECT * from Employee");
    console.log('Sequelize results: ', results);
    const response = {
        result: results,
        message: 'OK'
    }
    try {
        res.json(response)
    } catch (e) {
        res.status().send()
    }
})
// router.post('/', prepareTicoNumber);
// router.post('/device/scanner', callTicoNumber);
// router.post('/v2/device/scanner', callVoiceCallNumber);


export default router;
