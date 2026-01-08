import { TechStack } from '../../../../domain/tech-stack';

import { TechStackEntity } from '../entities/tech-stack.entity';

export class TechStackMapper {
  static toDomain(raw: TechStackEntity): TechStack {
    const domainEntity = new TechStack();
    domainEntity.name = raw.name;

    domainEntity.category = raw.category;

    domainEntity.icon = raw.icon;

    domainEntity.proficiency = raw.proficiency;

    domainEntity.order = raw.order;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: TechStack): TechStackEntity {
    const persistenceEntity = new TechStackEntity();
    persistenceEntity.name = domainEntity.name;

    persistenceEntity.category = domainEntity.category;

    persistenceEntity.icon = domainEntity.icon;

    persistenceEntity.proficiency = domainEntity.proficiency;

    persistenceEntity.order = domainEntity.order;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
