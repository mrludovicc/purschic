const db = require('../connection');

// CREATE

const addFavourite = (newFavourite) => {
  const { user_id, item_id } = newFavourite;

  return db
    .query(`
  INSERT INTO favorites (user_id, item_id)
  VALUES
  ($1, $2)
  RETURNING *;
  `, [user_id, item_id])
    .then((data) => data.rows)
};

// READ ALL
const getFavourites = (email) => {
  return db
    .query(`
    SELECT products.* FROM products
    JOIN favorites ON products.id = favorites.item_id
    JOIN users ON favorites.user_id = users.id
    WHERE users.email = $1`, [email])
    .then((data) => data.rows)
};

//READ ONE


//UPDATE


//DELETE

const deleteFavourite = (deleteFav) => {
  const { email, item_id } = deleteFav;
  console.log('line 38 from favoruites_queries', deleteFav)
  return db
    .query
    (`
    DELETE FROM favorites
    WHERE user_id = (SELECT id FROM users WHERE email = $1)
    AND item_id = $2;
    `, [email, item_id])
};


module.exports = { getFavourites, addFavourite, deleteFavourite };
