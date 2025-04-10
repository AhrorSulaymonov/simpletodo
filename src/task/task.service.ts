import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.prismaService.task.create({
      data: createTaskDto,
    });
  }

  findAll() {
    return this.prismaService.task.findMany({});
  }

  async findOne(id: number) {
    const task = await this.prismaService.task.findUnique({
      where: { id },
    });
    if (!task) throw new NotFoundException("task topilmadi");
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      return await this.prismaService.task.update({
        where: { id },
        data: { ...updateTaskDto },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.task.delete({ where: { id } });
  }
}
