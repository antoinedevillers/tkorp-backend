import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { PersonEntity } from '../person/person.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

// Cette classe sert à la fois de modèle TypeORM (base de données) et de type GraphQL
@ObjectType()
@Entity('animal')
export class AnimalEntity {
  // Identifiant unique, clé primaire auto-générée
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  // Nom de l'animal
  @Field()
  @Column()
  name: string;

  // Date de naissance (optionnelle)
  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  dateOfBirth: Date;

  // Espèce de l'animal
  @Field()
  @Column()
  species: string;

  // Race (optionnelle)
  @Field({ nullable: true })
  @Column({ nullable: true })
  breed: string;

  // Couleur (optionnelle)
  @Field({ nullable: true })
  @Column({ nullable: true })
  color: string;

  // Poids (optionnel, décimal)
  @Field(() => Float, { nullable: true })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  weight: number;

  // Clé étrangère vers le propriétaire (PersonEntity)
  @Field(() => Int)
  @Column()
  ownerId: number;

  // Relation ManyToOne : un animal appartient à une personne
  // 'eager: true' => le propriétaire est chargé automatiquement avec l'animal
  // 'onDelete: CASCADE' => si la personne est supprimée, ses animaux le sont aussi
  @Field(() => PersonEntity)
  @ManyToOne(() => PersonEntity, (person) => person.animals, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ownerId' })
  owner: PersonEntity;
}
