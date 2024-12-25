// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateBasharDto } from './create-bashar.dto';

export class UpdateBasharDto extends PartialType(CreateBasharDto) {}
