import { Blog } from '../../../../domain/blog';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { TagMapper } from '../../../../../tags/infrastructure/persistence/relational/mappers/tag.mapper';

import { BlogEntity } from '../entities/blog.entity';

export class BlogMapper {
  static toDomain(raw: BlogEntity): Blog {
    const domainEntity = new Blog();
    if (raw.createdBy) {
      domainEntity.createdBy = UserMapper.toDomain(raw.createdBy);
    }

    domainEntity.published = raw.published;

    domainEntity.publishedAt = raw.publishedAt;

    domainEntity.order = raw.order;

    if (raw.tags) {
      domainEntity.tags = raw.tags.map((item) => TagMapper.toDomain(item));
    }

    domainEntity.coverImage = raw.coverImage;

    domainEntity.content = raw.content;

    domainEntity.slug = raw.slug;

    domainEntity.title = raw.title;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Blog): BlogEntity {
    const persistenceEntity = new BlogEntity();
    if (domainEntity.createdBy) {
      persistenceEntity.createdBy = UserMapper.toPersistence(
        domainEntity.createdBy,
      );
    }

    persistenceEntity.published = domainEntity.published;

    persistenceEntity.publishedAt = domainEntity.publishedAt;

    persistenceEntity.order = domainEntity.order;

    if (domainEntity.tags) {
      persistenceEntity.tags = domainEntity.tags.map((item) =>
        TagMapper.toPersistence(item),
      );
    }

    persistenceEntity.coverImage = domainEntity.coverImage;

    persistenceEntity.content = domainEntity.content;

    persistenceEntity.slug = domainEntity.slug;

    persistenceEntity.title = domainEntity.title;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
