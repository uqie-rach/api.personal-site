import { FileType } from '../../../../domain/file';
import { FileEntity } from '../entities/file.entity';

export class FileMapper {
  static toDomain(raw: FileEntity): FileType {
    const domainEntity = new FileType();
    domainEntity.publicUrl = raw.publicUrl;
    domainEntity.id = raw.id;
    domainEntity.path = raw.path;
    return domainEntity;
  }

  static toPersistence(domainEntity: FileType): FileEntity {
    const persistenceEntity = new FileEntity();
    persistenceEntity.publicUrl = domainEntity.publicUrl;
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.path = domainEntity.path;
    return persistenceEntity;
  }
}
