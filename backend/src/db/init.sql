-- USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'employee',
  company_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- COMPANIES
CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  owner_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  logo TEXT,
  bin VARCHAR(12) UNIQUE
);

ALTER TABLE users
ADD CONSTRAINT fk_company
FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE;

-- CLIENTS
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255),
  company VARCHAR(255),
  notes TEXT,
  is_archived BOOLEAN DEFAULT false,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  telegram_chat_id BIGINT UNIQUE
);

-- DEALS
CREATE TABLE deals (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2),
  status VARCHAR(50) NOT NULL CHECK (status IN (
    'Lead','Contacted','Proposal','InProgress','Won','Lost'
  )),
  client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_by INTEGER,
  assigned_to INTEGER,
  close_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- REMINDERS
CREATE TABLE reminders (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  remind_at TIMESTAMP NOT NULL,
  is_done BOOLEAN DEFAULT false,
  client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
  deal_id INTEGER REFERENCES deals(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
  chat_id BIGINT NOT NULL,
  text TEXT NOT NULL,
  from_client BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ADMIN USER
INSERT INTO users (name, email, password, role)
VALUES (
  'admin',
  'admin@microcrm.local',
  '$2b$10$jy.n.Vb79uVefxFbbxPnu.cE9ib3a5VrjG5McPIRHRAJ9NJxue1pW',
  'admin'
)
ON CONFLICT (email) DO NOTHING;