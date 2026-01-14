const express = require('express');
const router = express.Router();
const { Person, Gathering, Transaction, Admin } = require('./models');
const QRCode = require('qrcode');

// --- Auth ---
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ where: { username, password } });
    if (admin) {
        res.json({ success: true, token: 'fake-jwt-token-for-mvp' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// --- Admins (New) ---
router.post('/admins', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existing = await Admin.findOne({ where: { username } });
        if (existing) return res.status(400).json({ error: 'Username already exists' });

        const admin = await Admin.create({ username, password });
        res.json({ success: true, username: admin.username });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/admins', async (req, res) => {
    const admins = await Admin.findAll({ attributes: ['id', 'username', 'createdAt'] });
    res.json(admins);
});

// --- Person ---
router.post('/people', async (req, res) => {
    try {
        const { fullName, phone } = req.body;
        const person = await Person.create({ fullName, phone });

        // Generate QR Data (just the ID for now)
        const qrData = JSON.stringify({ id: person.id, name: person.fullName });
        // Generate QR Image Data URL
        const qrCodeImage = await QRCode.toDataURL(qrData);

        person.qrCodeData = qrCodeImage;
        await person.save();

        res.json(person);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/people', async (req, res) => {
    const people = await Person.findAll({ order: [['createdAt', 'DESC']] });
    res.json(people);
});

router.get('/people/:id', async (req, res) => {
    try {
        const person = await Person.findByPk(req.params.id);
        if (person) res.json(person);
        else res.status(404).json({ error: "Person not found" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


// --- Gatherings ---
router.post('/gatherings', async (req, res) => {
    try {
        const { name, date } = req.body;
        const gathering = await Gathering.create({ name, date });
        res.json(gathering);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/gatherings', async (req, res) => {
    const gatherings = await Gathering.findAll({ order: [['date', 'DESC']] });
    res.json(gatherings);
});

// --- Transactions (The Core Logic) ---
router.post('/scan', async (req, res) => {
    try {
        const { personId, gatheringId } = req.body;

        // 1. Validate existence
        const person = await Person.findByPk(personId);
        const gathering = await Gathering.findByPk(gatheringId);

        if (!person || !gathering) {
            return res.status(404).json({ success: false, message: 'Person or Gathering not found' });
        }

        // 2. Check overlap
        const existingTransaction = await Transaction.findOne({
            where: {
                personId,
                gatheringId,
                status: 'RECEIVED' // Assuming we only care if they successfully received
            }
        });

        if (existingTransaction) {
            return res.status(400).json({
                success: false,
                message: 'ALREADY RECEIVED',
                personName: person.fullName,
                timestamp: existingTransaction.timestamp
            });
        }

        // 3. Record new transaction
        const newTransaction = await Transaction.create({
            personId,
            gatheringId,
            status: 'RECEIVED'
        });

        res.json({
            success: true,
            message: 'SUCCESS: MARKED AS RECEIVED',
            personName: person.fullName
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/transactions', async (req, res) => {
    const { gatheringId } = req.query;
    const whereClause = gatheringId ? { gatheringId } : {};

    const transactions = await Transaction.findAll({
        where: whereClause,
        include: [Person, Gathering],
        order: [['createdAt', 'DESC']]
    });
    res.json(transactions);
});

module.exports = router;
