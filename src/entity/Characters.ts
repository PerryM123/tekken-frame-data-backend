import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Characters {
  constructor() {
    this.id = 0;
    this.name = '';
    this.is_completed = false;
    this.description = '';
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  is_completed: boolean;

  @Column()
  description: string;
}
