import { Tag } from '../../../../domain/tag';

import { TagEntity } from '../entities/tag.entity';

export class TagMapper {
  static toDomain(raw: TagEntity): Tag {
    const domainEntity = new Tag();
    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Tag): TagEntity {
    const persistenceEntity = new TagEntity();
    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
