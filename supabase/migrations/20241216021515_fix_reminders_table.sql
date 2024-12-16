ALTER TABLE "public"."reminders"
    ALTER COLUMN "id" SET DEFAULT uuid_generate_v4(),
    ALTER COLUMN "created_at" SET DEFAULT TIMEZONE('utc'::text, NOW()),
    ALTER COLUMN "updated_at" SET DEFAULT TIMEZONE('utc'::text, NOW()),
    ALTER COLUMN "created_at" SET NOT NULL,
    ALTER COLUMN "updated_at" SET NOT NULL;

DROP TRIGGER IF EXISTS update_reminders_updated_at ON reminders;
CREATE TRIGGER update_reminders_updated_at
    BEFORE UPDATE ON reminders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();