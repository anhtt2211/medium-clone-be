import {MigrationInterface, QueryRunner} from "typeorm";

export class updateDb1660197319224 implements MigrationInterface {
    name = 'updateDb1660197319224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "image"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "image" character varying
        `);
    }

}
