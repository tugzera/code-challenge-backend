import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateInterestPointCategory } from 'src/interest-points/application/create-interest-point-category';
import { InterestPointProvider } from 'src/interest-points/infra/ioc/interest-point.provider';
import { CreateInterestPointCategoryDto } from '../dtos/inputs';
import { ResponseCreateInterestPointCategoryDto } from '../dtos/outputs';

@ApiTags('interest-point-categories')
@Controller('interest-point-categories')
export class InterestPointCategoryController {
  constructor(
    @Inject(InterestPointProvider.CREATE_INTEREST_POINT_CATEGORY)
    private createInterestPointCategory: CreateInterestPointCategory.Contract,
  ) {}

  @ApiCreatedResponse({ type: ResponseCreateInterestPointCategoryDto })
  @Post()
  async handleCreateInterestPointCategory(
    @Body() input: CreateInterestPointCategoryDto,
  ): Promise<ResponseCreateInterestPointCategoryDto> {
    return this.createInterestPointCategory.execute(input);
  }
}
