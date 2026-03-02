import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1772464074203 implements MigrationInterface {
  name = "CreateUser1772464074203";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "githubId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "githubId" character varying`,
    );
  }
}
