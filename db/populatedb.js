const { Client } = require('pg');

const categories = [
  'Action', 'Adventure', 'Role-playing', 'Simulation',
  'Strategy', 'Sports', 'Puzzle', 'Horror', 'Racing', 'Fighting'
];

const games = [
  {
    title: 'The Legend of Zelda: Breath of the Wild',
    description: 'An open-world action-adventure game set in a vast, post-apocalyptic world.',
    price: 59.99,
    rating: 9.5,
    release_date: '2017-03-03',
    category: 'Role-playing'
  },
  {
    title: 'Super Mario Odyssey',
    description: 'A 3D platformer where Mario travels across various worlds to rescue Princess Peach.',
    price: 59.99,
    rating: 9.0,
    release_date: '2017-10-27',
    category: 'Action'
  },
  {
    title: 'The Witcher 3: Wild Hunt',
    description: 'An open-world RPG where players control Geralt of Rivia in a fantasy world filled with monsters and magic.',
    price: 39.99,
    rating: 9.8,
    release_date: '2015-05-19',
    category: 'Role-playing'
  },
  {
    title: 'Dark Souls III',
    description: 'A challenging action RPG known for its intricate level design and deep lore.',
    price: 39.99,
    rating: 9.2,
    release_date: '2016-03-24',
    category: 'Role-playing'
  },
  {
    title: 'Minecraft',
    description: 'A sandbox game that allows players to build and explore virtual worlds made of blocks.',
    price: 26.95,
    rating: 9.0,
    release_date: '2011-11-18',
    category: 'Simulation'
  },
  {
    title: 'Fortnite',
    description: 'A battle royale game where players compete to be the last one standing on an ever-shrinking map.',
    price: 0.00,
    rating: 8.5,
    release_date: '2017-07-25',
    category: 'Action'
  },
  {
    title: 'Call of Duty: Warzone',
    description: 'A free-to-play battle royale game set in the Call of Duty universe.',
    price: 0.00,
    rating: 8.0,
    release_date: '2020-03-10',
    category: 'Action'
  },
  {
    title: 'Among Us',
    description: 'A multiplayer social deduction game where players work together to complete tasks while trying to identify impostors.',
    price: 4.99,
    rating: 8.0,
    release_date: '2018-06-15',
    category: 'Puzzle'
  },
  {
    title: 'Stardew Valley',
    description: 'A farming simulation game where players can grow crops, raise animals, and build relationships with villagers.',
    price: 14.99,
    rating: 9.0,
    release_date: '2016-02-26',
    category: 'Simulation'
  },
  {
    title: 'The Elder Scrolls V: Skyrim',
    description: 'An open-world RPG set in a fantasy world filled with dragons, magic, and epic quests.',
    price: 39.99,
    rating: 9.5,
    release_date: '2011-11-11',
    category: 'Role-playing'
  },
  {
    title: 'Animal Crossing: New Horizons',
    description: 'A life simulation game where players can create and manage their own island paradise.',
    price: 59.99,
    rating: 9.0,
    release_date: '2020-03-20',
    category: 'Simulation'
  },
  {
    title: 'Overwatch',
    description: 'A team-based multiplayer first-person shooter with a diverse cast of characters.',
    price: 39.99,
    rating: 8.5,
    release_date: '2016-05-24',
    category: 'Action'
  },
  {
    title: 'League of Legends',
    description: 'A multiplayer online battle arena (MOBA) game where players control champions and compete in teams.',
    price: 0.00,
    rating: 9.0,
    release_date: '2009-10-27',
    category: 'Strategy'
  },
  {
    title: 'Counter-Strike: Global Offensive',
    description: 'A tactical first-person shooter where teams compete to complete objectives or eliminate the opposing team.',
    price: 14.99,
    rating: 8.5,
    release_date: '2012-08-21',
    category: 'Action'
  },
  {
    title: 'The Sims 4',
    description: 'A life simulation game where players can create and control people in a virtual world.',
    price: 39.99,
    rating: 8.0,
    release_date: '2014-09-02',
    category: 'Simulation'
  },
  {
    title: 'FIFA 22',
    description: 'A football simulation game that allows players to control real-life teams and players.',
    price: 59.99,
    rating: 8.0,
    release_date: '2021-10-01',
    category: 'Sports'
  },
  {
    title: 'NBA 2K22',
    description: 'A basketball simulation game that features realistic gameplay and various game modes.',
    price: 59.99,
    rating: 8.5,
    release_date: '2021-09-10',
    category: 'Sports'
  }
];

async function main() {
  const client = new Client({
    connectionString: "postgresql://postgres:qazzaq@localhost:5432/inventory_app",
  });

  console.log("Populating database...");
  await client.connect();

  console.log("Inserting categories...");
  for (const name of categories) {
    await client.query(`INSERT INTO categories (category) VALUES ($1) ON CONFLICT (category) DO NOTHING`, [name]);
  }

  console.log("Inserting games...");
  for (const game of games) {
    const res = await client.query(
      `SELECT id FROM categories WHERE category = $1`,
      [game.category]
    );
    const categoryId = res.rows[0]?.id;

    if (!categoryId) {
      console.warn(`Category not found: ${game.category}, skipping the game ${game.title}`);
      continue;
    }

    await client.query(
      `INSERT INTO games (title, description, price, rating, release_date, category_id)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [game.title, game.description, game.price, game.rating, game.release_date, categoryId]
    );
  }

  await client.end();
  console.log("Database populated successfully.");
}

main();