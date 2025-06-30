import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AnimalEntity } from '../animal/animal.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@ObjectType()
@Entity('person')
export class PersonEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  lastName: string;

  @Field()
  @Column({ length: 100 })
  firstName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phoneNumber: string;

  // Déclaration de la relation One-to-Many
  // Une personne a plusieurs animaux
  @Field(() => [AnimalEntity])
  @OneToMany(() => AnimalEntity, (animal) => animal.owner)
  animals: AnimalEntity[];
}
