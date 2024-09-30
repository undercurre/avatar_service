import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_avatars')
export class UserAvatar {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  avatar_url: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
