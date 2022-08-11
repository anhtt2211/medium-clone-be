import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTablePost1660100975291 implements MigrationInterface {
    name = 'updateTablePost1660100975291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "posts"
            ALTER COLUMN "title" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ALTER COLUMN "description" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ALTER COLUMN "content" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ALTER COLUMN "image" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "posts"
            ALTER COLUMN "image"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ALTER COLUMN "content"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ALTER COLUMN "description"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ALTER COLUMN "title"
            SET NOT NULL
        `);
    }

}
