import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class OrderProductColAmout1606672196838
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'order_products',
      new TableColumn({
        name: 'amount',
        type: 'numeric',
        default: 0,
      }),
    );
    await queryRunner.query(
      `UPDATE "order_products" SET "amount" = "quantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP COLUMN "quantity"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'order_products',
      new TableColumn({
        name: 'quantity',
        type: 'numeric',
        default: 0,
      }),
    );

    await queryRunner.query(
      `UPDATE "order_products" SET "quantity" = "amount" `,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP COLUMN "amount"`,
    );
  }
}
