import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

const ROLE_TYPE = {
  ADMIN: 0,
  MEMBER: 1,
  GUEST: 2
} as const;

@Entity()
export class Users {
  constructor() {
    this.id = 0;
    this.name = '';
    this.password = '';
    this.email = '';
    this.role_id = ROLE_TYPE.GUEST;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  role_id: number;
}
