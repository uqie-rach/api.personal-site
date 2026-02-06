import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDescToBlog1768200293354 implements MigrationInterface {
  name = 'AddDescToBlog1768200293354';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blog" ADD "description" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "description"`);
  }
}
