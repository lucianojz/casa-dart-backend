import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateOrderProducts1606422108850
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order_products" ("order_id" uuid NOT NULL, "product_id" uuid NOT NULL, "quantity" numeric NOT NULL, "value" numeric NOT NULL, "freight_charge" numeric NOT NULL, CONSTRAINT "PK_df651f408724961907ab06672fa" PRIMARY KEY ("order_id", "product_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD CONSTRAINT "FK_f258ce2f670b34b38630914cf9e" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD CONSTRAINT "FK_2d58e8bd11dc840b39f99824d84" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP CONSTRAINT "FK_2d58e8bd11dc840b39f99824d84"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP CONSTRAINT "FK_f258ce2f670b34b38630914cf9e"`,
    );
    await queryRunner.query(`DROP TABLE "order_products"`);
  }
}
