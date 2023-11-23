const express = require('express');
const Router = express.Router();
const db = require('../database');
Router.get('/', (err, res) => {
  res.render('register', { title: 'Fill Form', password: '', email: '' })
})

// home.js

// Display the admin_op page
Router.get('/admin_op', (req, res) => {
  db.query('SELECT * FROM tourism_database.tourist_spots', (err, results) => {
    if (err) {
      console.error('Error querying tourist spots:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.render('admin_op', { tourist_spots: results });
  });
});
Router.get('/admin_op_rest', (req, res) => {
  db.query('SELECT * FROM tourism_database.restaurants', (err, results) => {
    if (err) {
      console.error('Error querying tourist spots:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.render('admin_op_rest', { restaurants: results });
  });
});

Router.get('/admin_op_hotel', (req, res) => {
  db.query('SELECT * FROM tourism_database.hotels', (err, results) => {
    if (err) {
      console.error('Error querying tourist spots:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.render('admin_op_hotel', { hotels: results });
  });
});
// Create a new tourist spot
Router.post('/admin_op/create', (req, res) => {
  const { id, name, location, description, opening_hours, admission_fee, image, district_id, pincode} = req.body;

  db.query(
    'INSERT INTO tourism_database.tourist_spots (spot_id,place_name, location, description, opening_hour, entry_fee,IMAGE,district_id,pincode) VALUES (?,?, ?, ?, ?, ?,?,?,?)',
    [id, name, location, description, opening_hours, admission_fee, image, district_id,pincode],
    (err, results) => {
      if (err) {
        console.error('Error inserting tourist spot:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.redirect('/admin_op'); // Redirect to the admin_op page after creating a record
    }
  );
});
Router.post('/admin_op_rest/create', (req, res) => {
  const { id, name, rating, street, city, pincode, image, district_id } = req.body;

  db.query(
    'INSERT INTO tourism_database.restaurants (id, name, rating, street, city, pincode ,image_url, district_id) VALUES (?,?, ?, ?, ?, ?,?,?)',
    [id, name, rating, street, city, pincode, image, district_id],
    (err, results) => {
      if (err) {
        console.error('Error inserting tourist spot:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.redirect('/admin_op_rest'); // Redirect to the admin_op page after creating a record
    }
  );
});


Router.post('/admin_op_hotel/create', (req, res) => {
  const { id, name, rating, street, city, pincode, image, district_id, number, price } = req.body;

  db.query(
    'INSERT INTO tourism_database.hotels (id, name, rating, street, city, pincode, image_url, district_id, number,price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? )',
    [id, name, rating, street, city, pincode, image, district_id, number, price],
    (err, results) => {
      if (err) {
        console.error('Error inserting hotel:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.redirect('/admin_op_hotel'); // Redirect to the admin_op page after creating a record
    }
  );
});


// Update a tourist spot
Router.post('/admin_op/update', (req, res) => {
  const { id, name, location, description, opening_hours, admission_fee } = req.body;

  db.query(
    'UPDATE tourism_database.tourist_spots SET place_name=?, location=?, Description=?, opening_hour=?, entry_fee=? WHERE spot_id=?',
    [name, location, description, opening_hours, admission_fee, id],
    (err, results) => {
      if (err) {
        console.error('Error updating tourist spot:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.redirect('/admin_op'); // Redirect to the admin_op page after updating a record
    }
  );
});


Router.post('/admin_op_rest/update', (req, res) => {
  const { id, name, rating, street, city, pincode, image } = req.body;

  db.query(
    'UPDATE tourism_database.restaurants SET name=?, rating=?, street=?, city=?, pincode=? , image_url=? WHERE id=?',
    [name, rating, street, city, pincode, image, id],
    (err, results) => {
      if (err) {
        console.error('Error updating tourist spot:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.redirect('/admin_op_rest'); // Redirect to the admin_op page after updating a record
    }
  );
});

Router.post('/admin_op_hotel/update', (req, res) => {
  const { id, name, rating, street, city, pincode, image, district_id, number, price } = req.body;

  db.query(
    'UPDATE tourism_database.hotels SET name=?, rating=?, street=?, city=?, pincode=?, image_url=?, district_id=?, number=?, price=? WHERE id=?',
    [name, rating, street, city, pincode, image, district_id, number, price, id],
    (err, results) => {
      console.log('Update Results:', results);
      console.log('Update Error:', err);

      if (err) {
        console.error('Error updating hotel:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.redirect('/admin_op_hotel'); // Redirect to the admin_op page after updating a record
    }
  );
});


// Delete a tourist spot
Router.post('/admin_op/delete', (req, res) => {
  const { id } = req.body;

  db.query('DELETE FROM tourism_database.tourist_spots WHERE spot_id=?', [id], (err, results) => {
    if (err) {
      console.error('Error deleting tourist spot:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.redirect('/admin_op'); // Redirect to the admin_op page after deleting a record
  });
});


Router.post('/admin_op_rest/delete', (req, res) => {
  const { id } = req.body;

  db.query('DELETE FROM tourism_database.restaurants WHERE id=?', [id], (err, results) => {
    if (err) {
      console.error('Error deleting tourist spot:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.redirect('/admin_op_rest'); // Redirect to the admin_op page after deleting a record
  });
});

Router.post('/admin_op_hotel/delete', (req, res) => {
  const { id } = req.body;

  db.query('DELETE FROM tourism_database.hotels WHERE id=?', [id], (err, results) => {
    if (err) {
      console.error('Error deleting hotel:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.redirect('/admin_op_hotel'); // Redirect to the admin_op page after deleting a record
  });
});


module.exports = Router;


Router.get('/Mysore', (err, res) => {

  res.render('Mysore', { title: 'Fill Form', password: '', email: '' });

})
Router.get('/admin', (err, res) => {

  res.render('admin', { title: 'Fill Form', password: '', email: '' });

})

Router.get('/mysore_restaurants', (err, res) => {
  db.query('SELECT * FROM tourism_database.restaurants;', (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Pass the results to the 'customers' view
    res.render('mysore_restaurants', { restaurants: results });

  })
})

Router.get('/mysore_places', (err, res) => {
  db.query('SELECT * FROM tourism_database.tourist_spots', (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Pass the results to the 'customers' view
    res.render('mysore_places', { spots: results });

  })
})

Router.get('/mysore_hotels', (err, res) => {
  db.query('SELECT * FROM tourism_database.hotels;', (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Pass the results to the 'customers' view
    res.render('mysore_hotels', { hotels: results });

  })
})


//AGGREGATE AND NESTED
Router.get('/mysore_aggr', (req, res) => {
  // Get the user-provided minimum rating value from the query parameters
  const userPincode = req.query.pincode || '';
  const minRating = req.query.minRating || 3.5;

  // Call the stored procedure to get hotels and restaurants
  const procedureQuery = 'CALL GetHotelsAndRestaurant(?, ?)';
  db.query(procedureQuery, [userPincode, minRating], (err, result) => {
    if (err) {
      console.error('Error calling stored procedure:', err);
      console.log(result)
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log(result)
    const hotelsAndRestaurants = result[0];
    const filteredResults = hotelsAndRestaurants.filter(item => item.pincode === userPincode);

    console.log('Filtered Results:', filteredResults);
    // Query for the maximum rating from restaurants
    /*db.query('SELECT MAX(rating) AS max_rating FROM restaurants', (err, ratingResult) => {
      if (err) {
        console.error('Error querying maximum rating:', err);
        res.status(500).send('Internal Server Error');
        return;
      }*/

    // Query for tourist spots in cities with average rating greater than the user-provided minimum rating
    db.query(
      'SELECT * FROM restaurants WHERE rating > ? AND pincode = ?',
      [minRating, userPincode],
      (err, restResult) => {
        if (err) {
          console.error('Error querying hotels:', err);
          res.status(500).send('Internal Server Error');
          return;
        }

        // Calculate the average entry fee for tourist spots in each district
        /*db.query(
          'SELECT districts.district_name, AVG(tourist_spots.entry_fee) AS average_entry_fee ' +
          'FROM districts ' +
          'LEFT JOIN tourist_spots ON districts.district_id = tourist_spots.district_id ' +
          'GROUP BY districts.district_name',
          (err, entryFeeResult) => {
            if (err) {
              console.error('Error querying average entry fee:', err);
              res.status(500).send('Internal Server Error');
              return;
            }*/

        // Find hotels with a rating greater than the average rating
        /*db.query(
          'SELECT name, rating FROM hotels ' +
          'WHERE rating > (SELECT AVG(rating) FROM hotels)',
          (err, highRatedHotels) => {
            if (err) {
              console.error('Error querying high-rated hotels:', err);
              res.status(500).send('Internal Server Error');
              return;
            }*/

        // Join hotels and restaurants tables
        db.query(
          'SELECT h.name as hotel_name, h.rating as hotel_rating, r.name as restaurant_name, r.rating as restaurant_rating ' +
          'FROM hotels h ' +
          'JOIN restaurants r ON h.pincode = r.pincode',
          (err, hotelsRestaurantsResult) => {
            if (err) {
              console.error('Error querying hotels and restaurants:', err);
              res.status(500).send('Internal Server Error');
              return;
            }

            /* // Find tourist spots with an entry fee less than the average entry fee
             db.query(
               'SELECT Place_name, entry_fee FROM tourist_spots ' +
               'WHERE entry_fee < (SELECT AVG(entry_fee) FROM tourist_spots)',
               (err, lowEntryFeeSpots) => {
                 if (err) {
                   console.error('Error querying low entry fee spots:', err);
                   res.status(500).send('Internal Server Error');
                   return;
                 }*/


            // Calculate the total entry fee for tourist spots in each district with a specific pincode
            db.query(
              'SELECT districts.district_name, SUM(tourist_spots.entry_fee) AS total_entry_fee ' +
              'FROM districts ' +
              'LEFT JOIN tourist_spots ON districts.district_id = tourist_spots.district_id ' +
              'WHERE tourist_spots.pincode = ? ' + // Add condition to filter by pincode
              'GROUP BY districts.district_id, districts.district_name',
              [userPincode], // Parameter for pincode
              (err, TotentryFeeResult) => {
                if (err) {
                  console.error('Error querying total entry fee:', err);
                  res.status(500).send('Internal Server Error');
                  return;
                }

                // Query for tourist spots in the specified pincode
                db.query(
                  'SELECT * FROM tourist_spots WHERE pincode = ?',
                  [userPincode],
                  (err, touristSpotResult) => {
                    if (err) {
                      console.error('Error querying tourist spots:', err);
                      res.status(500).send('Internal Server Error');
                      return;
                    }

                    // Pass all the results to the 'mysore_aggr' view
                    res.render('mysore_aggr', {
                      //maxRating: ratingResult[0].max_rating,
                      restResults: restResult,
                      //averageEntryFee: entryFeeResult,
                      //highRatedHotels: highRatedHotels,
                      //lowEntryFeeSpots: lowEntryFeeSpots,
                      minRating: minRating,
                      userPincode: userPincode,
                      hotelsAndRestaurants: filteredResults,
                      TotalEntryFee: TotentryFeeResult,
                      touristSpotResult: touristSpotResult,
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  }
  );
});/*
});
});
});*/



// Sign-up route
Router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email already exists in the database
    db.query('SELECT * FROM tourism_database.customer_info WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      if (results.length === 0) {
        // Email is not registered, insert the new user data into the database
        db.query(
          'INSERT INTO tourism_database.customer_info (name, email, password) VALUES (?, ?, ?)',
          [name, email, password],
          (err, results) => {
            if (err) {
              console.error('Error inserting user data:', err);
              res.status(500).send('Internal Server Error');
              return;
            }
            res.render('register', { title: 'Sign-up Successful' });
          }
        );
      } else {
        // Email is already registered
        res.render('register', { title: 'Email already in use', name: '', email: '' });
      }
    });
  } catch (error) {
    res.render('register', { title: 'Error Form', name: '', email: '' });
  }
});

Router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the user is admin
  if (email === 'admin@gmail.com' && password === '1234') {
    res.render('admin', { title: 'Admin Page' });
    return;
  }

  // Query the MySQL database to check if the user exists
  db.query(
    'SELECT * FROM tourism_database.customer_info WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      if (results.length === 1) {
        db.query('SELECT district_name, link FROM tourism_database.districts', (err, results) => {
          if (err) {
            console.error('Error querying database:', err);
            res.status(500).send('Internal Server Error');
            return;
          }

          // Pass the results to the 'customers' view
          res.render('customers', { districts: results });
        });
      } else {
        // Invalid credentials
        res.render('login', { title: 'Invalid Credentials', password: '', email: '' });
      }
    }
  );
});
Router.get('/customer_backup', (req, res) => {

  db.query('SELECT * FROM tourism_database.customer_info_backup', (err, backupResults) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Pass the results to the 'customer_backup' view
    res.render('customer_backup', { backups: backupResults });
  });
});




// GET request to render the initial page with all hotel data
Router.get('/mysore_price', (req, res) => {
  // Fetch all data from the 'hotels' table
  db.query('SELECT * FROM hotels', (err, hotelResults) => {
    if (err) {
      console.error('Error fetching hotel data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Render the page with all hotel data
    res.render('mysore_price', { hotels: hotelResults, total_price: undefined, selectedHotel: undefined });
  });
});

// POST request to calculate total price and fetch selected hotel information
Router.post('/mysore_price', (req, res) => {
  const hotelId = req.body.hotelId;
  const numberOfBeds = req.body.numberOfBeds;
  const numberOfDays = req.body.numberOfDays;
  const numberOfRooms = req.body.numberOfRooms;  // Added line

  db.query(
    'CALL CalculateTotalPrice(?, ?, ?, ?, @total_price)',
    [hotelId, numberOfBeds, numberOfDays, numberOfRooms],  // Modified line
    (err, results) => {
      if (err) {
        console.error('Error calling CalculateTotalPrice stored procedure:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      // Fetch the result from the OUT parameter
      db.query('SELECT @total_price AS total_price', (err, totalPriceResults) => {
        if (err) {
          console.error('Error fetching total_price:', err);
          res.status(500).send('Internal Server Error');
          return;
        }

        const total_price = totalPriceResults[0].total_price;

        // Fetch selected hotel information
        fetchHotelInfo(hotelId, (err, selectedHotel) => {
          if (err) {
            res.status(500).send('Internal Server Error');
            return;
          }

          // Fetch all data from the 'hotels' table
          db.query('SELECT * FROM hotels', (err, hotelResults) => {
            if (err) {
              console.error('Error fetching hotel data:', err);
              res.status(500).send('Internal Server Error');
              return;
            }

            // Render the page with all hotel data, selected hotel information, and total_price
            res.render('mysore_price', { hotels: hotelResults, total_price, selectedHotel });
          });
        });
      });
    }
  );
});

// Function to fetch hotel information from the database
const fetchHotelInfo = (hotelId, callback) => {
  db.query('SELECT * FROM hotels WHERE id = ?', [hotelId], (err, hotelResults) => {
    if (err) {
      console.error('Error fetching hotel information:', err);
      callback(err, null);
    } else {
      const hotelInfo = hotelResults[0]; // Assuming there is only one hotel with the given ID
      callback(null, hotelInfo);
    }
  });
};











module.exports = Router;
