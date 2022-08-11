import {MigrationInterface, QueryRunner} from "typeorm";

export class updateDb1660197283862 implements MigrationInterface {
    name = 'updateDb1660197283862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "role"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "language"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "avatar" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ALTER COLUMN "user_id"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ALTER COLUMN "user_id" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "avatar"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "language" character varying(15) NOT NULL DEFAULT 'en-US'
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "role" character varying(30) NOT NULL DEFAULT 'STANDARD'
        `);
    }

}
