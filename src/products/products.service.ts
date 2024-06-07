import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product)
    private productsRepository: Repository<Product>
    ) { }

    findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }
    findOne(id: number): Promise<Product> {
        return this.productsRepository.findOne({ where: { id } });
    }
    create(product: Product): Promise<Product> {
        return this.productsRepository.save(product);
    }
    async update(id: number, productDto: Partial<Product>): Promise<void> {
        await this.productsRepository.update(id, productDto);
    }
    async remove(id: number): Promise<void> {
        await this.productsRepository.delete(id);
    }
}
