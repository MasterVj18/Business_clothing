package com.example.demo.service;

import com.example.demo.model.Expense;
import com.example.demo.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;

    @Autowired
    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Optional<Expense> getExpenseById(Long id) {
        return expenseRepository.findById(id);
    }

    @Transactional
    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    @Transactional
    public Optional<Expense> updateExpense(Long id, Expense expense) {
        return expenseRepository.findById(id)
                .map(existingExpense -> {
                    existingExpense.setName(expense.getName());
                    existingExpense.setAmount(expense.getAmount());
                    existingExpense.setDate(expense.getDate());
                    return expenseRepository.save(existingExpense);
                });
    }

    @Transactional
    public boolean deleteExpense(Long id) {
        return expenseRepository.findById(id)
                .map(expense -> {
                    expenseRepository.delete(expense);
                    return true;
                })
                .orElse(false);
    }
} 