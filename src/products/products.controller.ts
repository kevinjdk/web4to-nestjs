import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }

    @Get()
    findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Product> {
        return this.productService.findOne(id);
    }
    @Post()
    create(@Body() product: Product): Promise<Product> {
        return this.productService.create(product);
    }
    @Put(':id')
    update(@Param('id') id: number, @Body() updateProductDto: Partial<Product>): Promise<void> {
        return this.productService.update(id, updateProductDto);
    }
    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.productService.remove(id);
    }

}
