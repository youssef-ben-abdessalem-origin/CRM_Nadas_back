
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
    const cols = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'forecast_stage_mapping';");
    cols.rows.forEach(r => console.log(r.column_name));

  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

main();
