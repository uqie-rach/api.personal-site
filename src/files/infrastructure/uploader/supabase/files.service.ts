import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  FileRepository,
} from '../../persistence/file.repository';
import { FileType } from '../../../domain/file';
import { AllConfigType } from '../../../../config/config.type';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

@Injectable()
export class FilesSupabaseService {
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
      throw new UnprocessableEntityException('Supabase client is not initialized');
    }

    const bucketName = this.configService.get('file.supabaseBucket', { infer: true }) as string | undefined;
    if (!bucketName) {
      throw new UnprocessableEntityException('Supabase bucket name is not configured');
    }

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
      throw new UnprocessableEntityException(`Failed to upload file to Supabase: ${error.message}`);
    }

    const { data } = this.supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return {
      file: await this.fileRepository.create({
        path: data.publicUrl,
      })
    }
  }

  async findById(id: string) {
    if (!id) {
      throw new BadRequestException('Id is required');
    }

    const image = await this.fileRepository.findById(id);

    if (!image) throw new NotFoundException('Image not found');

    console.log(typeof image)

    return {
      file: image
    };
  }
}
