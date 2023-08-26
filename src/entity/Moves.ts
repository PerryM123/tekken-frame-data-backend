import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Moves {
  constructor() {
    this.id = 0;
    this.character_id = 0;
    this.input = '';
    this.start_up = 0;
    this.hit_type = '';
    this.damage = '';
    this.block = 0;
    this.hit = 0;
    this.counter = 0;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  character_id: number;

  @Column()
  input: string;

  @Column()
  start_up: number;

  @Column()
  hit_type: string;

  @Column()
  damage: string;

  @Column()
  block: number;

  @Column()
  hit: number;

  @Column()
  counter: number;
}
