ALTER TABLE "public"."notes" 
    ALTER COLUMN "id" SET DEFAULT uuid_generate_v4(),
    ALTER COLUMN "created_at" SET DEFAULT TIMEZONE('utc'::text, NOW()),
    ALTER COLUMN "updated_at" SET DEFAULT TIMEZONE('utc'::text, NOW()),
    ALTER COLUMN "title" SET NOT NULL,
    ALTER COLUMN "content" SET NOT NULL,
    ALTER COLUMN "created_at" SET NOT NULL,
    ALTER COLUMN "updated_at" SET NOT NULL;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TRIGGER IF EXISTS update_notes_updated_at ON notes;
DROP FUNCTION IF EXISTS update_updated_at_column;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_notes_updated_at
    BEFORE UPDATE ON notes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();