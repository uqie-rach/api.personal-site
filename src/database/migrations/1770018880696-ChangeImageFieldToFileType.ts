import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeImageFieldToFileType1770018880696
  implements MigrationInterface
{
  name = 'ChangeImageFieldToFileType1770018880696';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "portfolio" RENAME COLUMN "image" TO "imageId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ALTER COLUMN "publicUrl" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "portfolio" DROP COLUMN "imageId"`);
    await queryRunner.query(`ALTER TABLE "portfolio" ADD "imageId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "portfolio" ADD CONSTRAINT "FK_ab63f2dea6aeb0ff1a66a37edb1" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "portfolio" DROP CONSTRAINT "FK_ab63f2dea6aeb0ff1a66a37edb1"`,
    );
    await queryRunner.query(`ALTER TABLE "portfolio" DROP COLUMN "imageId"`);
    await queryRunner.query(
      `ALTER TABLE "portfolio" ADD "imageId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ALTER COLUMN "publicUrl" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "portfolio" RENAME COLUMN "imageId" TO "image"`,
    );
  }
}
