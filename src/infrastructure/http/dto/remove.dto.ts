import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { ToBoolean } from 'core/transforms/decorators/to-boolean.decorator';

export class RemoveDto {
  @ApiPropertyOptional({
    description:
      'The "soft" property is optional and indicates whether to perform a soft delete.'
  })
  @IsOptional()
  @ToBoolean()
  @IsBoolean()
  readonly soft: boolean;
}
