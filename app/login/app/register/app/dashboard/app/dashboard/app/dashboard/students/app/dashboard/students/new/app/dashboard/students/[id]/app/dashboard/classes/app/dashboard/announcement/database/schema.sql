create extension if not exists "uuid-ossp";

create table schools (
  id uuid primary key default uuid_generate_v4(),
  name text not null, logo_url text, address text, phone text, email text,
  motto text, academic_year text, currency text default 'XAF',
  grading_system jsonb default '{"A":"16-20","B":"14-15","C":"12-13","D":"10-11","E":"8-9","F":"0-7"}',
  subscription_status text default 'trial',
  trial_ends_at timestamptz default now() + interval '30 days',
  created_at timestamptz default now()
);

create table users (
  id uuid primary key references auth.users(id) on delete cascade,
  school_id uuid references schools(id) on delete cascade,
  full_name text not null, email text not null,
  role text not null check (role in ('super_admin','admin','teacher','accountant','parent','student')),
  phone text, is_active boolean default true,
  created_at timestamptz default now()
);

create table academic_years (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id) on delete cascade,
  name text not null, start_date date, end_date date, is_current boolean default false
);

create table terms (
  id uuid primary key default uuid_generate_v4(),
  academic_year_id uuid references academic_years(id) on delete cascade,
  name text not null, start_date date, end_date date, is_current boolean default false
);

create table classes (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id) on delete cascade,
  name text not null,
  section text check (section in ('primary','secondary')),
  level text, class_teacher_id uuid,
  created_at timestamptz default now()
);

create table subjects (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id) on delete cascade,
  name text not null, code text
);

create table class_subjects (
  id uuid primary key default uuid_generate_v4(),
  class_id uuid references classes(id) on delete cascade,
  subject_id uuid references subjects(id) on delete cascade,
  teacher_id uuid references users(id) on delete set null,
  unique(class_id, subject_id)
);

create table teachers (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  school_id uuid references schools(id) on delete cascade,
  teacher_number text unique, qualifications text,
  employment_date date, is_active boolean default true
);

create table parents (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  school_id uuid references schools(id) on delete cascade,
  relationship text, occupation text, address text
);

create table students (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id) on delete cascade,
  student_number text unique not null,
  full_name text not null, date_of_birth date,
  gender text check (gender in ('male','female')),
  photo_url text, address text,
  class_id uuid references classes(id) on delete set null,
  admission_date date default current_date,
  parent_id uuid references parents(id) on delete set null,
  parent_phone text, emergency_contact text,
  medical_info text, previous_school text,
  status text default 'active' check (status in ('active','graduated','transferred','inactive')),
  created_at timestamptz default now()
);

create table attendance (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid references students(id) on delete cascade,
  class_id uuid references classes(id) on delete cascade,
  date date not null,
  status text check (status in ('present','absent','late','excused')),
  marked_by uuid references users(id),
  unique(student_id, date)
);

create table fee_structures (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id) on delete cascade,
  class_id uuid references classes(id) on delete cascade,
  academic_year_id uuid references academic_years(id),
  term_id uuid references terms(id),
  tuition numeric default 0, registration numeric default 0,
  examination numeric default 0, other numeric default 0
);

create table payments (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid references students(id) on delete cascade,
  school_id uuid references schools(id) on delete cascade,
  receipt_number text unique not null,
  amount numeric not null,
  method text check (method in ('cash','bank','mobile_money','card','other')),
  paid_at timestamptz default now(),
  recorded_by uuid references users(id), notes text
);

create table examinations (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id) on delete cascade,
  name text not null, term_id uuid references terms(id),
  start_date date, end_date date, is_published boolean default false
);

create table marks (
  id uuid primary key default uuid_generate_v4(),
  examination_id uuid references examinations(id) on delete cascade,
  student_id uuid references students(id) on delete cascade,
  subject_id uuid references subjects(id) on delete cascade,
  max_marks numeric default 100, obtained numeric,
  entered_by uuid references users(id),
  unique(examination_id, student_id, subject_id)
);

create table announcements (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id) on delete cascade,
  title text not null, body text not null, audience text default 'all',
  class_id uuid references classes(id),
  created_by uuid references users(id),
  created_at timestamptz default now()
);

create table audit_logs (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id),
  user_id uuid references users(id),
  action text not null, details jsonb,
  created_at timestamptz default now()
);
