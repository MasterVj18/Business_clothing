package com.example.demo.service;

import com.example.demo.model.Sale;
import com.example.demo.model.SaleItem;
import com.example.demo.repository.SaleItemRepository;
import com.example.demo.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private SaleItemRepository saleItemRepository;

    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    public Sale getSaleById(int id) {
        return saleRepository.findById(id).orElse(null);
    }

    public Sale createSale(Sale sale) {
        Sale savedSale = saleRepository.save(sale);
        for (SaleItem item : sale.getItems()) {
            item.setSale(savedSale);
            saleItemRepository.save(item);
        }
        return savedSale;
    }

    public Sale updateSale(int id, Sale sale) {
        if (!saleRepository.existsById(id)) {
            return null;
        }
        sale.setId((long) id);
        for (SaleItem item : sale.getItems()) {
            item.setSale(sale);
        }
        return saleRepository.save(sale);
    }

    public void deleteSale(int id) {
        saleRepository.deleteById(id);
    }
}
