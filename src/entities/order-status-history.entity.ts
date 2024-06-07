import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('order_status_history')
export class OrderStatusHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order.statusHistory)
  order: Order;

  @Column()
  status: string;

  @CreateDateColumn()
  changed_at: Date;
}
