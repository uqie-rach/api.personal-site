import { Experience } from '../../../../domain/experience';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { ExperienceEntity } from '../entities/experience.entity';

export class ExperienceMapper {
  static toDomain(raw: ExperienceEntity): Experience {
    const domainEntity = new Experience();
    if (raw.ownedBy) {
      domainEntity.ownedBy = UserMapper.toDomain(raw.ownedBy);
    }

    domainEntity.title = raw.title;

    domainEntity.company = raw.company;

    domainEntity.location = raw.location;

    domainEntity.startDate = raw.startDate;

    domainEntity.endDate = raw.endDate;

    domainEntity.isCurrently = raw.isCurrently;

    domainEntity.workStyle = raw.workStyle;

    domainEntity.description = raw.description;

    domainEntity.accomplishments = raw.accomplishments;

    domainEntity.order = raw.order;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Experience): ExperienceEntity {
    const persistenceEntity = new ExperienceEntity();
    if (domainEntity.ownedBy) {
      persistenceEntity.ownedBy = UserMapper.toPersistence(
        domainEntity.ownedBy,
      );
    }

    persistenceEntity.title = domainEntity.title;

    persistenceEntity.company = domainEntity.company;

    persistenceEntity.location = domainEntity.location;

    persistenceEntity.startDate = domainEntity.startDate;

    persistenceEntity.endDate = domainEntity.endDate;

    persistenceEntity.isCurrently = domainEntity.isCurrently;

    persistenceEntity.workStyle = domainEntity.workStyle;

    persistenceEntity.description = domainEntity.description;

    persistenceEntity.accomplishments = domainEntity.accomplishments;

    persistenceEntity.order = domainEntity.order;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
