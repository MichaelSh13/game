import { IsOptional, IsUUID } from "class-validator";

export class CashoutDto {
  @IsUUID()
  @IsOptional()
  accountId?: string;
}
