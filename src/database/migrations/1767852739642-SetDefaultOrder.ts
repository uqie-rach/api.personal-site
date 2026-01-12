import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetDefaultOrder1767852739642 implements MigrationInterface {
  name = 'SetDefaultOrder1767852739642';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "experience" ALTER COLUMN "order" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "tech_stack" ALTER COLUMN "order" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "portfolio" ALTER COLUMN "order" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" ALTER COLUMN "order" SET DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blog" ALTER COLUMN "order" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "portfolio" ALTER COLUMN "order" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "tech_stack" ALTER COLUMN "order" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "experience" ALTER COLUMN "order" DROP DEFAULT`,
    );
  }
}
