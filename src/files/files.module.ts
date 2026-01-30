import {
  // common
  Module,
} from '@nestjs/common';
import { RelationalFilePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesService } from './files.service';
import fileConfig from './config/file.config';
import { FileConfig, FileDriver } from './config/file-config.type';
import { FilesLocalModule } from './infrastructure/uploader/local/files.module';
import { FilesS3Module } from './infrastructure/uploader/s3/files.module';
import { FilesSupabaseModule } from './infrastructure/uploader/supabase/files.module';

const infrastructurePersistenceModule = RelationalFilePersistenceModule;

const infrastructureUploaderModule =
  (fileConfig() as FileConfig).driver === FileDriver.LOCAL
    ? FilesLocalModule
    : (fileConfig() as FileConfig).driver === FileDriver.S3
      ? FilesS3Module
      : FilesSupabaseModule;

      console.log(infrastructureUploaderModule)

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
    infrastructureUploaderModule,
  ],
  providers: [FilesService],
  exports: [FilesService, infrastructurePersistenceModule],
})
export class FilesModule {}
