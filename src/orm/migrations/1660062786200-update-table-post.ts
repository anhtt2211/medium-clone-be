import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTablePost1660062786200 implements MigrationInterface {
    name = 'updateTablePost1660062786200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "content" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "image" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "created_by" integer NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "created_by"
        `);
        await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "image"
        `);
        await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "content"
        `);
    }

}
