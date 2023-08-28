// const express = require('express');
// const cookieParser = require('cookie-parser');
// const crypto = require('crypto');
// var router = express.Router();

// //const router = express();

// // Middleware to parse cookies
// router.use(cookieParser());

// // Example: Middleware to decrypt the "myCookie" and expose the "id" value
// router.use((req, res, next) => {
//   const encryptedCookie = req.cookies.myCookie;

//   if (!encryptedCookie) {
//     return res.status(400).json({ error: 'Cookie not found' });
//   }

//   // Replace 'yourSecretKey' with your actual secret key used for encryption
//   const secretKey = 'yourSecretKey';
//   const decipher = crypto.createDecipher('aes256', secretKey);

//   let decryptedData = '';
//   try {
//     decryptedData = decipher.update(encryptedCookie, 'hex', 'utf8') + decipher.final('utf8');
//   } catch (error) {
//     console.error('Error decrypting cookie:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }

//   try {
//     // Assuming the decrypted data is in JSON format
//     const parsedData = JSON.parse(decryptedData);
//     if (parsedData && parsedData.id) {
//       req.decryptedId = parsedData.id;
//     } else {
//       return res.status(400).json({ error: 'Invalid data in cookie' });
//     }
//   } catch (error) {
//     console.error('Error parsing decrypted data:', error);
//     return res.status(400).json({ error: 'Invalid data format in cookie' });
//   }

//   next();
// });

// // Endpoint to expose the decrypted "id" value
// router.get('/id', (req, res) => {
//   if (req.decryptedId) {
//     res.json({ id: req.decryptedId });
//   } else {
//     res.status(400).json({ error: 'Decrypted ID not found' });
//   }
// });

// module.exports = router;