import { IsDateString, IsNotEmpty, IsArray, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { Secteur } from '../../secture/schema/secteurs.schema';
import { Market } from '../../market/schema/market.schema';

export class CreatePlanDto {
  @IsDateString()
  @IsNotEmpty()
  Date: string;

  @Type(() => Market)
  market: Market;

  @IsArray()
  @Type(() => Secteur)
  secteurMatinal: Secteur[];

  @IsArray()
  @Type(() => Secteur)
  secteurApresMidi: Secteur[];

  @IsNumber()
  totalMatin: number;

  @IsNumber()
  totalMidi: number;
}
