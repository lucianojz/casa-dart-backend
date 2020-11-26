import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateFKCustomerOrder1606349934430
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'customer');
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'customer_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'OrderCustomer_FK',
        columnNames: ['customer_id'],
        referencedTableName: 'customers',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders', 'OrderCustomer_FK');
    await queryRunner.dropColumn('orders', 'customer_id');
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'customer',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
