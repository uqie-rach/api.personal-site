import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTechToArrayStr1768283506816 implements MigrationInterface {
  name = 'AlterTechToArrayStr1768283506816';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "portfolio" ADD "technologies" character varying array NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "portfolio" DROP COLUMN "technologies"`,
    );
  }
}
