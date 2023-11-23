// routes/admin.js

const express = require('express');
const Router = express.Router();
const db = require('../database');

Router.get('/admin', async (req, res) => {
    try {
        // Fetch districts for populating dropdown
        const districts = await getDistricts();
        res.render('admin', { title: 'Admin Page', districts });
    } catch (error) {
        console.error('Error fetching districts:', error);
        res.status(500).send('Internal Server Error');
    }
});

Router.post('/admin/add-district', async (req, res) => {
    try {
        const { districtName, districtLink } = req.body;

        // Validate inputs
        if (!districtName || !districtLink) {
            return res.json({ success: false, message: 'Please fill in both district name and link.' });
        }

        // Check if the district already exists
        const existingDistrict = await getDistrictByName(districtName);
        if (existingDistrict) {
            return res.json({ success: false, message: 'District already exists.' });
        }

        // Add the district to the database
        await addDistrict(districtName, districtLink);

        // Fetch updated list of districts
        const districts = await getDistricts();

        // Send success response with updated districts
        res.json({ success: true, districts });
    } catch (error) {
        console.error('Error adding district:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

Router.post('/admin/remove-district', async (req, res) => {
    try {
        const { removeDistrict } = req.body;

        // Validate selection
        if (!removeDistrict) {
            return res.json({ success: false, message: 'Please select a district to remove.' });
        }

        // Remove the district from the database
        await removeDistrictByName(removeDistrict);

        // Fetch updated list of districts
        const districts = await getDistricts();

        // Send success response with updated districts
        res.json({ success: true, districts });
    } catch (error) {
        console.error('Error removing district:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

async function getDistricts() {
    return new Promise((resolve, reject) => {
        db.query('SELECT district_name, link FROM tourism_database.districts', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function getDistrictByName(districtName) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM tourism_database.districts WHERE district_name = ?', [districtName], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
    });
}

async function addDistrict(districtName, districtLink) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO tourism_database.districts (district_name, link) VALUES (?, ?)', [districtName, districtLink], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function removeDistrictByName(districtName) {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM tourism_database.districts WHERE district_name = ?', [districtName], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = Router;
