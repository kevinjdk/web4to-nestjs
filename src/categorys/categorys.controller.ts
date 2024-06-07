import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CategorysService } from './categorys.service';

@Controller('categorys')
export class CategorysController {
    constructor(private readonly categoryService: CategorysService){}

    @Get()
    findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }
    @Get(':id')
    findOne(id: number): Promise<Category> {
        return this.categoryService.findOne(id);
    }
    @Post()
    create(@Body() category: Category): Promise<Category> {
        return this.categoryService.create(category);
    }
    @Put(':id')
    update(@Param('id') id: number, @Body() updateCategoryDto: Partial<Category>): Promise<void>{
        return this.categoryService.update(id, updateCategoryDto)
    }
    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.categoryService.remove(id)
    }
}
