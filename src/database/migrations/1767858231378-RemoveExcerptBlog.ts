import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveExcerptBlog1767858231378 implements MigrationInterface {
  name = 'RemoveExcerptBlog1767858231378';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "excerpt"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blog" ADD "excerpt" character varying NOT NULL`,
    );
  }
}
