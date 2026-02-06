import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeDescToAccOnExp1770197414720 implements MigrationInterface {
  name = 'ChangeDescToAccOnExp1770197414720';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "portfolio" DROP CONSTRAINT "FK_ab63f2dea6aeb0ff1a66a37edb1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "experience" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "experience" DROP COLUMN "accomplishments"`,
    );
    await queryRunner.query(
      `ALTER TABLE "experience" ADD "accomplishments" character varying array`,
    );
    await queryRunner.query(
      `ALTER TABLE "portfolio" ADD CONSTRAINT "UQ_ab63f2dea6aeb0ff1a66a37edb1" UNIQUE ("imageId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "portfolio" ADD CONSTRAINT "FK_ab63f2dea6aeb0ff1a66a37edb1" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "portfolio" DROP CONSTRAINT "FK_ab63f2dea6aeb0ff1a66a37edb1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "portfolio" DROP CONSTRAINT "UQ_ab63f2dea6aeb0ff1a66a37edb1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "experience" DROP COLUMN "accomplishments"`,
    );
    await queryRunner.query(
      `ALTER TABLE "experience" ADD "accomplishments" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "experience" ADD "description" character varying array NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "portfolio" ADD CONSTRAINT "FK_ab63f2dea6aeb0ff1a66a37edb1" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
