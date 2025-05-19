package com.example.demo.repository;

import com.example.demo.model.SaleItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaleItemRepository extends JpaRepository<SaleItem, Integer> {
    List<SaleItem> findBySaleId(int saleId);
}
