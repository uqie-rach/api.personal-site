import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPublicUrlToFile1770011012821 implements MigrationInterface {
  name = 'AddPublicUrlToFile1770011012821';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "file" ADD "publicUrl" character varying NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "publicUrl"`);
  }
}
