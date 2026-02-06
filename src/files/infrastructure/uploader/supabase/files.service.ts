import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileRepository } from '../../persistence/file.repository';
import { FileType } from '../../../domain/file';
import { FileStoragePort } from '../../../domain/ports/file-storage.port';
import { AllConfigType } from '../../../../config/config.type';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

@Injectable()
export class FilesSupabaseService implements FileStoragePort {
  private supabase: SupabaseClient;

  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly fileRepository: FileRepository,
  ) {
    const supabaseUrl = this.configService.get('file.supabaseUrl', {
      infer: true,
    });
    const supabaseKey = this.configService.get('file.supabaseServiceRoleKey', {
      infer: true,
    });

    if (supabaseUrl && supabaseKey) {
      this.supabase = createClient(supabaseUrl, supabaseKey);
    }
  }

  async create(file: Express.Multer.File): Promise<{ file: FileType }> {
    if (!this.supabase) {
      throw new UnprocessableEntityException(
        'Supabase client is not initialized',
      );
    }

    const bucketName = this.getBucket();

    const fileId = randomUUID();
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${fileId}.${fileExtension}`;
    const filePath = `uploads/${fileName}`;

    const { error } = await this.supabase.storage
      .from(bucketName)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      throw new UnprocessableEntityException(
        `Failed to upload file to Supabase: ${error.message}`,
      );
    }

    const { data } = this.supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return {
      file: await this.fileRepository.create({
        path: filePath,
        publicUrl: data.publicUrl,
      }),
    };
  }

  /**
   * Alias untuk create yang sesuai dengan FileStoragePort interface
   */
  async upload(file: Express.Multer.File): Promise<{
    filePath: string;
    publicUrl: string;
  }> {
    if (!this.supabase) {
      throw new UnprocessableEntityException(
        'Supabase client is not initialized',
      );
    }

    const bucketName = this.getBucket();

    const fileId = randomUUID();
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${fileId}.${fileExtension}`;
    const filePath = `uploads/${fileName}`;

    const { error } = await this.supabase.storage
      .from(bucketName)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      throw new UnprocessableEntityException(
        `Failed to upload file to Supabase: ${error.message}`,
      );
    }

    const { data } = this.supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return {
      filePath,
      publicUrl: data.publicUrl,
    };
  }

  async findById(id: string) {
    console.log('[1] from supa service');
    if (!id) {
      throw new BadRequestException('Id is required');
    }

    const image = await this.fileRepository.findById(id);

    if (!image) throw new NotFoundException('Image not found');

    return {
      file: image,
    };
  }
  /**
   * ADAPTER: Hapus file dari storage saja (tanpa database)
   * FilesService akan handle orchestration storage + database
   *
   * @param filePath Path file di storage
   * @throws UnprocessableEntityException jika gagal menghapus dari storage
   */
  async _delete(filePath: string): Promise<void> {
    if (!this.supabase) {
      throw new UnprocessableEntityException(
        'Supabase client is not initialized',
      );
    }

    const bucketName = this.getBucket();

    const { error } = await this.supabase.storage
      .from(bucketName)
      .remove([filePath]);

    if (error) {
      throw new UnprocessableEntityException(
        `Failed to delete image from storage: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  }

  /**
   * Alias untuk _delete yang sesuai dengan FileStoragePort interface
   * ADAPTER hanya hapus storage, orchestration ada di FilesService
   */
  async delete(filePath: string): Promise<void> {
    return this._delete(filePath);
  }

  private getBucket(): string {
    const bucket = this.configService.get('file.supabaseBucket', {
      infer: true,
    });
    if (!bucket) {
      throw new UnprocessableEntityException('Bucket not configured');
    }
    return bucket;
  }

  private extractSupabasePath(publicUrl: string): string {
    const marker = '/storage/v1/object/public/';

    const index = publicUrl.indexOf(marker);
    if (index === -1) {
      throw new Error('Invalid Supabase public URL');
    }

    return publicUrl.substring(index + marker.length);
  }
}
