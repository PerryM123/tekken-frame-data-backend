import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Users {

  constructor() { 
    this.id = 0;
    this.name = "";
    this.password = "";
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  password: string

}
