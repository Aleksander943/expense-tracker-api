import 'dotenv/config';
import pg from 'pg';

const baseUrl = process.env.E2E_API_URL || 'http://localhost:8080';
const dbUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!dbUrl) {
  console.error('E2E_FAIL: DIRECT_URL/DATABASE_URL nao configurada');
  process.exit(1);
}

const stamp = Date.now();
const testUser = {
  name: `E2E User ${stamp}`,
  email: `e2e.${stamp}@teste.com`,
  password: 'senha12345',
};

async function healthCheck() {
  const res = await fetch(`${baseUrl}/teste-direto`);
  if (!res.ok) {
    throw new Error(`healthcheck ${res.status}`);
  }
}

async function registerUser() {
  const res = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testUser),
  });

  const raw = await res.text();
  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    body = raw;
  }

  return { status: res.status, body };
}

async function checkDatabase(email) {
  const client = new pg.Client({
    connectionString: dbUrl,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();
  const q = await client.query('SELECT id, name, email FROM "User" WHERE email = $1', [email]);
  await client.end();
  return q.rows[0] || null;
}

async function main() {
  await healthCheck();

  const api = await registerUser();
  console.log(`API_STATUS=${api.status}`);
  console.log(`API_BODY=${JSON.stringify(api.body)}`);

  const dbUser = await checkDatabase(testUser.email);
  if (!dbUser) {
    console.log('DB_CHECK=NOT_FOUND');
    process.exit(2);
  }

  console.log('DB_CHECK=FOUND');
  console.log(`DB_USER=${JSON.stringify(dbUser)}`);
  console.log('E2E_OK');
}

main().catch((err) => {
  console.error(`E2E_FAIL=${err.message}`);
  process.exit(1);
});
