import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateInterestPoint } from 'src/interest-points/application/create-interest-point';
import { InterestPointProvider } from 'src/interest-points/infra/ioc/interest-point.provider';
import { CreateInterestPointDto } from '../dtos/inputs';
import { ResponseCreateInterestPointCategoryDto } from '../dtos/outputs';

@ApiTags('interest-points')
@Controller('interest-points')
export class InterestPointController {
  constructor(
    @Inject(InterestPointProvider.CREATE_INTEREST_POINT)
    private createInterestPoint: CreateInterestPoint.Contract,
  ) {}

  @ApiCreatedResponse({ type: ResponseCreateInterestPointCategoryDto })
  @Post()
  async handleCreateInterestPointCategory(
    @Body() input: CreateInterestPointDto,
  ): Promise<ResponseCreateInterestPointCategoryDto> {
    return this.createInterestPoint.execute({
      ...input,
      description: input.description || null,
    });
  }
}
