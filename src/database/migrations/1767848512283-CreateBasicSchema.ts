import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBasicSchema1767848512283 implements MigrationInterface {
  name = 'CreateBasicSchema1767848512283';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "experience" ("title" character varying NOT NULL, "company" character varying NOT NULL, "location" character varying NOT NULL, "startDate" character varying NOT NULL, "endDate" character varying, "isCurrently" boolean NOT NULL, "workStyle" character varying NOT NULL, "description" character varying NOT NULL, "accomplishments" character varying, "order" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownedById" integer NOT NULL, CONSTRAINT "PK_5e8d5a534100e1b17ee2efa429a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tech_stack" ("name" character varying NOT NULL, "category" character varying NOT NULL, "icon" character varying NOT NULL, "proficiency" character varying NOT NULL, "order" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_28ce6942fffe078dd648ae71d4a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "portfolio" ("title" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "liveUrl" character varying, "repoUrl" character varying NOT NULL, "featured" boolean NOT NULL, "order" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownedById" integer NOT NULL, CONSTRAINT "PK_6936bb92ca4b7cda0ff28794e48" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tag" ("name" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "blog" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "slug" character varying NOT NULL, "excerpt" character varying NOT NULL, "content" character varying NOT NULL, "coverImage" character varying NOT NULL, "published" boolean NOT NULL, "publishedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "order" integer NOT NULL, "createdById" integer NOT NULL, CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "portfolio_technologies_tech_stack" ("portfolioId" uuid NOT NULL, "techStackId" uuid NOT NULL, CONSTRAINT "PK_757b735f0ef6800d12b24b1c832" PRIMARY KEY ("portfolioId", "techStackId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fd119e1a06817e0a4cc7ac7321" ON "portfolio_technologies_tech_stack" ("portfolioId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_42edb835b0a7ba76ad455b0a4a" ON "portfolio_technologies_tech_stack" ("techStackId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "blog_tags_tag" ("blogId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_163bef1f79bd1f15b07f75e072d" PRIMARY KEY ("blogId", "tagId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9572d27777384d535f77ed780d" ON "blog_tags_tag" ("blogId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_066934a149d9efba507443ce88" ON "blog_tags_tag" ("tagId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "experience" ADD CONSTRAINT "FK_2b65af046ee46042aa76d0d7c83" FOREIGN KEY ("ownedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "portfolio" ADD CONSTRAINT "FK_1ce77f061b98d8289c94870cd60" FOREIGN KEY ("ownedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" ADD CONSTRAINT "FK_287cd519dc9dae2f1bb0f7c095a" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "portfolio_technologies_tech_stack" ADD CONSTRAINT "FK_fd119e1a06817e0a4cc7ac73215" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "portfolio_technologies_tech_stack" ADD CONSTRAINT "FK_42edb835b0a7ba76ad455b0a4a8" FOREIGN KEY ("techStackId") REFERENCES "tech_stack"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog_tags_tag" ADD CONSTRAINT "FK_9572d27777384d535f77ed780d0" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog_tags_tag" ADD CONSTRAINT "FK_066934a149d9efba507443ce889" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blog_tags_tag" DROP CONSTRAINT "FK_066934a149d9efba507443ce889"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog_tags_tag" DROP CONSTRAINT "FK_9572d27777384d535f77ed780d0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "portfolio_technologies_tech_stack" DROP CONSTRAINT "FK_42edb835b0a7ba76ad455b0a4a8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "portfolio_technologies_tech_stack" DROP CONSTRAINT "FK_fd119e1a06817e0a4cc7ac73215"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" DROP CONSTRAINT "FK_287cd519dc9dae2f1bb0f7c095a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "portfolio" DROP CONSTRAINT "FK_1ce77f061b98d8289c94870cd60"`,
    );
    await queryRunner.query(
      `ALTER TABLE "experience" DROP CONSTRAINT "FK_2b65af046ee46042aa76d0d7c83"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_066934a149d9efba507443ce88"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9572d27777384d535f77ed780d"`,
    );
    await queryRunner.query(`DROP TABLE "blog_tags_tag"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_42edb835b0a7ba76ad455b0a4a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fd119e1a06817e0a4cc7ac7321"`,
    );
    await queryRunner.query(`DROP TABLE "portfolio_technologies_tech_stack"`);
    await queryRunner.query(`DROP TABLE "blog"`);
    await queryRunner.query(`DROP TABLE "tag"`);
    await queryRunner.query(`DROP TABLE "portfolio"`);
    await queryRunner.query(`DROP TABLE "tech_stack"`);
    await queryRunner.query(`DROP TABLE "experience"`);
  }
}
