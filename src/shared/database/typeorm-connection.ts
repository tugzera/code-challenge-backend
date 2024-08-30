import { DataSource } from 'typeorm';
import { DatabaseConnection } from '../contracts/database-connection';
import { dataSource } from './config';

export class TypeormConnection implements DatabaseConnection {
  private connection: DataSource | null;

  async connect(): Promise<DataSource> {
    this.connection = dataSource;
    await this.connection.initialize();
    return this.connection;
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.destroy();
      this.connection = null;
    }
  }
}
