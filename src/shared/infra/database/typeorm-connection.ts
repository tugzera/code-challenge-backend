import { DataSource, DataSourceOptions } from 'typeorm';
import { DatabaseConnection } from '../../domain/contracts/database-connection';

export class TypeormConnection implements DatabaseConnection {
  private connection: DataSource | null;
  private config: DataSourceOptions;

  constructor(props: { config: DataSourceOptions }) {
    this.config = props.config;
    this.connection = new DataSource(this.config);
  }

  async connect(): Promise<DataSource> {
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
