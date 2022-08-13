import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePosts1660056981560 implements MigrationInterface {
  name = 'CreatePosts1660056981560';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "posts" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "description" character varying NOT NULL,
                CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id")
            )
        `);
    // await queryRunner.query(`
    //         ALTER TABLE "users" DROP COLUMN "title"
    //     `);
    // await queryRunner.query(`
    //         ALTER TABLE "users" DROP COLUMN "description"
    //     `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`
    //         ALTER TABLE "users"
    //         ADD "description" character varying NOT NULL
    //     `);
    // await queryRunner.query(`
    //         ALTER TABLE "users"
    //         ADD "title" character varying NOT NULL
    //     `);
    await queryRunner.query(`
            DROP TABLE "posts"
        `);
  }
}
