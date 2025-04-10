import {
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  iscompleted?: boolean;

  @IsOptional()
  @IsBoolean()
  isdeleted?: boolean;
}
