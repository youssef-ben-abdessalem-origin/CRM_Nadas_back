
const { Client } = require('pg');

async function main() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'admin',
    database: 'CRM_NEW_2026',
  });

  try {
    await client.connect();
    
    // 1. Seed Mappings
    const mappings = [
      { id: 1, cat: 'PIPELINE' },
      { id: 2, cat: 'PIPELINE' },
      { id: 3, cat: 'BEST_CASE' },
      { id: 4, cat: 'COMMIT' },
      { id: 5, cat: 'CLOSED' }
    ];

    for (const m of mappings) {
       await client.query(
         'INSERT INTO forecast_stage_mapping ("dealStageId", "category", "stageName") VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
         [m.id, m.cat, '']
       );
    }
    console.log('Mappings seeded.');

    // 2. Ensure an OPEN period
    await client.query("UPDATE forecast_periods SET status = 'OPEN' WHERE id = 1;");
    console.log('Period 1 opened.');

    // 3. Seed some targets for users
    const users = await client.query('SELECT id FROM users;');
    for (const u of users.rows) {
       await client.query(
         'INSERT INTO forecast_targets ("userId", "periodId", "targetValue") VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
         [u.id, 1, 100000]
       );
    }
    console.log('Targets seeded.');

  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

main();
