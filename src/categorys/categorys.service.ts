import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategorysService {
    constructor(@InjectRepository(Category)
    private categorysRepository: Repository<Category>
    ) { }

    findAll(): Promise<Category[]> {
        return this.categorysRepository.find();
    }
    findOne(id: number): Promise<Category> {
        return this.categorysRepository.findOne({ where: { id } });
    }
    create(category: Category): Promise<Category> {
        return this.categorysRepository.save(category);
    }
    async update(id: number, updatecategoryDto: Partial<Category>): Promise<void> {
        await this.categorysRepository.update(id, updatecategoryDto);
    }
    async remove(id: number): Promise<void> {
        await this.categorysRepository.delete(id);
    }
}
