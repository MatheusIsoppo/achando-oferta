ALTER TABLE posts ADD COLUMN IF NOT EXISTS has_table BOOLEAN DEFAULT FALSE, ADD COLUMN IF NOT EXISTS table_data JSONB DEFAULT '[]'::jsonb, ADD COLUMN IF NOT EXISTS use_third_column BOOLEAN DEFAULT FALSE, ADD COLUMN IF NOT EXISTS column_names JSONB DEFAULT '{\
col1\: \Coluna
1\, \col2\: \Coluna
2\, \col3\: \Coluna
3\}'::jsonb;
