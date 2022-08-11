import {MigrationInterface, QueryRunner} from "typeorm";

export class updateDb1660060928175 implements MigrationInterface {
    name = 'updateDb1660060928175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "user_id" integer
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
            ALTER TABLE "posts" DROP COLUMN "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "created_at"
        `);
    }

}
