-- SinoGlobal Enterprise — Initial Schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- ─── Workers ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS workers (
  id               SERIAL PRIMARY KEY,
  first_name       TEXT        NOT NULL,
  last_name        TEXT        NOT NULL,
  email            TEXT,
  phone            TEXT,
  access_token     TEXT        NOT NULL UNIQUE,
  job_title        TEXT        NOT NULL,
  department       TEXT        NOT NULL,
  contract_start   TEXT        NOT NULL,
  contract_end     TEXT        NOT NULL,
  contract_deal    TEXT        NOT NULL,
  payment_status   TEXT        NOT NULL DEFAULT 'pending',
  payment_amount   NUMERIC(12,2) NOT NULL DEFAULT 0,
  payment_paid     NUMERIC(12,2) NOT NULL DEFAULT 0,
  assigned_country TEXT,
  country_entry_date TEXT,
  country_stay_years INTEGER,
  photo_url        TEXT,
  nationality      TEXT,
  passport_number  TEXT,
  status           TEXT        NOT NULL DEFAULT 'active',
  hired_by         TEXT,
  notes            TEXT,
  created_at       TIMESTAMP   NOT NULL DEFAULT NOW()
);

-- ─── Job Roles ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS job_roles (
  id               SERIAL PRIMARY KEY,
  title            TEXT        NOT NULL,
  department       TEXT        NOT NULL,
  description      TEXT        NOT NULL,
  responsibilities TEXT        NOT NULL,
  requirements     TEXT        NOT NULL,
  salary           TEXT        NOT NULL,
  photo_url        TEXT        NOT NULL,
  is_active        BOOLEAN     NOT NULL DEFAULT TRUE
);

-- ─── Leave Types ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leave_types (
  id                SERIAL PRIMARY KEY,
  name              TEXT        NOT NULL,
  description       TEXT        NOT NULL,
  max_days          INTEGER     NOT NULL,
  amount            NUMERIC(10,2) NOT NULL DEFAULT 0,
  requires_approval BOOLEAN     NOT NULL DEFAULT TRUE,
  is_active         BOOLEAN     NOT NULL DEFAULT TRUE
);

-- ─── Leave Requests ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leave_requests (
  id            SERIAL PRIMARY KEY,
  worker_id     INTEGER     NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
  leave_type_id INTEGER     NOT NULL REFERENCES leave_types(id),
  start_date    TEXT        NOT NULL,
  end_date      TEXT        NOT NULL,
  reason        TEXT,
  status        TEXT        NOT NULL DEFAULT 'pending',
  admin_note    TEXT,
  created_at    TIMESTAMP   NOT NULL DEFAULT NOW()
);

-- ─── Leave Letters ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leave_letters (
  id              SERIAL PRIMARY KEY,
  worker_id       INTEGER     NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
  leave_type_id   INTEGER     NOT NULL REFERENCES leave_types(id),
  subject         TEXT        NOT NULL,
  body            TEXT        NOT NULL,
  recipient_title TEXT        NOT NULL,
  status          TEXT        NOT NULL DEFAULT 'submitted',
  created_at      TIMESTAMP   NOT NULL DEFAULT NOW()
);
