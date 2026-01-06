import "reflect-metadata";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";

const saltRounds = 10;

@Entity()
export class RootUser {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({ type: "datetime", nullable: true })
  updatedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    if (this.password) {
      /* eslint-disable node/no-sync */
      this.password = bcrypt.hashSync(this.password, saltRounds);
    }
  }
}
