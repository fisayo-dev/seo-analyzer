CREATE TABLE "seo_analysis" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"on_page" jsonb NOT NULL,
	"content" jsonb NOT NULL,
	"technical" jsonb NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "seo_analysis" ADD CONSTRAINT "seo_analysis_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;