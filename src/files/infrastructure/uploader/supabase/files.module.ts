import { HttpStatus, Module, UnprocessableEntityException } from '@nestjs/common';
import { FilesSupabaseService } from './files.service';
import { FilesSupabaseController } from './files.controller';
import { RelationalFilePersistenceModule } from '../../persistence/relational/relational-persistence.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AllConfigType } from '../../../../config/config.type';
import multer from 'multer';

const infrastructurePersistenceModule = RelationalFilePersistenceModule;

@Module({
  imports: [
    infrastructurePersistenceModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfigType>) => {
        return {
          fileFilter: (request, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
              return callback(
                new UnprocessableEntityException({
                  status: HttpStatus.UNPROCESSABLE_ENTITY,
                  errors: {
                    file: 'cantUploadFileType'
                  },
                }),
                false
              )
            }

            callback(null, true);
          },
          storage: multer.memoryStorage(),
          limits: {
            fileSize: configService.get('file.maxFileSize', { infer: true })
          }
        }
      }
    }),
  ],
  providers: [FilesSupabaseService],
  controllers: [FilesSupabaseController],
  exports: [FilesSupabaseService]
})
export class FilesSupabaseModule { }
