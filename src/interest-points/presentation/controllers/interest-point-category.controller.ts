import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateInterestPointCategory } from 'src/interest-points/application/create-interest-point-category';
import { GetNearbyInterestPoints } from 'src/interest-points/application/get-nearby-interest-points';
import { InterestPointProvider } from 'src/interest-points/infra/ioc/interest-point.provider';
import {
  CreateInterestPointCategoryDto,
  GetNearbyInterestPointsDto,
} from '../dtos/inputs';
import {
  ResponseCreateInterestPointCategoryDto,
  ResponseGetNearbyInterestPointsDto,
} from '../dtos/outputs';

@ApiTags('interest-point-categories')
@Controller('interest-point-categories')
export class InterestPointCategoryController {
  constructor(
    @Inject(InterestPointProvider.CREATE_INTEREST_POINT_CATEGORY)
    private createInterestPointCategory: CreateInterestPointCategory.Contract,
    @Inject(InterestPointProvider.GET_NEARBY_INTEREST_POINTS)
    private getNearbyInterestPoints: GetNearbyInterestPoints.Contract,
  ) {}

  @ApiCreatedResponse({ type: ResponseCreateInterestPointCategoryDto })
  @Post()
  async handleCreateInterestPointCategory(
    @Body() input: CreateInterestPointCategoryDto,
  ): Promise<ResponseCreateInterestPointCategoryDto> {
    return this.createInterestPointCategory.execute(input);
  }

  @ApiOkResponse({ type: ResponseGetNearbyInterestPointsDto })
  @Get('nearby')
  async handleGetNearbyInterestPoints(
    @Query() input: GetNearbyInterestPointsDto,
  ): Promise<ResponseGetNearbyInterestPointsDto[]> {
    return this.getNearbyInterestPoints.execute({
      latitude: Number(input.latitude),
      longitude: Number(input.longitude),
      distance: input.distance,
    });
  }
}
