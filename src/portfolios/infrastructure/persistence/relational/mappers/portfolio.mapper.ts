import { Portfolio } from '../../../../domain/portfolio';
import { FileMapper } from '../../../../../files/infrastructure/persistence/relational/mappers/file.mapper';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { PortfolioEntity } from '../entities/portfolio.entity';

export class PortfolioMapper {
  static toDomain(raw: PortfolioEntity): Portfolio {
    const domainEntity = new Portfolio();
    if (raw.image) {
      domainEntity.image = FileMapper.toDomain(raw.image);
    } else if (raw.image === null) {
      domainEntity.image = null;
    }

    if (raw.ownedBy) {
      domainEntity.ownedBy = UserMapper.toDomain(raw.ownedBy);
    }

    domainEntity.title = raw.title;

    domainEntity.description = raw.description;

    domainEntity.technologies = raw.technologies;

    domainEntity.liveUrl = raw.liveUrl;

    domainEntity.repoUrl = raw.repoUrl;

    domainEntity.featured = raw.featured;

    domainEntity.order = raw.order;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Portfolio): PortfolioEntity {
    const persistenceEntity = new PortfolioEntity();
    if (domainEntity.image) {
      persistenceEntity.image = FileMapper.toPersistence(domainEntity.image);
    } else if (domainEntity.image === null) {
      persistenceEntity.image = null;
    }

    if (domainEntity.ownedBy) {
      persistenceEntity.ownedBy = UserMapper.toPersistence(
        domainEntity.ownedBy,
      );
    }
    // persistenceEntity.image = FileMapper.toPersistence(domainEntity.image);

    persistenceEntity.title = domainEntity.title;

    persistenceEntity.description = domainEntity.description;

    persistenceEntity.technologies = domainEntity.technologies;

    persistenceEntity.liveUrl = domainEntity.liveUrl;

    persistenceEntity.repoUrl = domainEntity.repoUrl;

    persistenceEntity.featured = domainEntity.featured;

    persistenceEntity.order = domainEntity.order;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
