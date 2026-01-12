// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateTechStackDto } from './create-tech-stack.dto';

export class UpdateTechStackDto extends PartialType(CreateTechStackDto) {}
