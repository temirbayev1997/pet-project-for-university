-- Создание таблицы users с полем role
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE clients
ADD COLUMN user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE deals
ADD COLUMN user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE reminders
ADD COLUMN user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;
-- Создание таблицы clients
CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255),
  company VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы deals
CREATE TABLE IF NOT EXISTS deals (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2),
  status VARCHAR(50) NOT NULL CHECK (status IN (  'Lead',
  'Contacted',
  'Proposal',
  'InProgress',
  'Won',
  'Lost'
  )),
  client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
  close_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание admin пользователя (пароль: admin123)
INSERT INTO users (username, email, password, role)
VALUES ('admin', 'admin@microcrm.local', '$2b$10$jy.n.Vb79uVefxFbbxPnu.cE9ib3a5VrjG5McPIRHRAJ9NJxue1pW', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Структура таблицы reminders для напоминаний, связанных с клиентами и сделками
CREATE TABLE reminders (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  remind_at TIMESTAMP NOT NULL,
  is_done BOOLEAN DEFAULT false,

  client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
  deal_id INTEGER REFERENCES deals(id) ON DELETE CASCADE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE clients
ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT false;

-- Deals
ALTER TABLE deals
ADD COLUMN IF NOT EXISTS created_by INTEGER;

ALTER TABLE deals
ADD COLUMN IF NOT EXISTS assigned_to INTEGER;