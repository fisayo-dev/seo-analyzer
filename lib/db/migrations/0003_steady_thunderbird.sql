ALTER TABLE "seo_analysis" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "seo_analysis" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();