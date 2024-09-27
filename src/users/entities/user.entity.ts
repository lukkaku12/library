import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  Admin = 'admin',
  User = 'user',
}

@Entity()
export class user {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;
}
