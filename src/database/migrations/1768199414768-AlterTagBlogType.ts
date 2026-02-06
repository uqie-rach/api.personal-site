import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTagBlogType1768199414768 implements MigrationInterface {
  name = 'AlterTagBlogType1768199414768';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blog" ADD "tags" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "experience" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "experience" ADD "description" character varying array NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "experience" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "experience" ADD "description" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "tags"`);
  }
}
