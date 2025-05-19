import React, { useEffect, useState } from "react";
import { getAllSuppliers, addSupplier, updateSupplier, deleteSupplier } from "../services/supplierService";
import "./SupplierList.css"; // Import CSS

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: ""
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const data = await getAllSuppliers();
      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleAddSupplier = async () => {
    try {
      await addSupplier(newSupplier);
      fetchSuppliers();
      setNewSupplier({
        name: "",
        contactPerson: "",
        phone: "",
        email: "",
        address: ""
      });
    } catch (error) {
      console.error("Error adding supplier:", error);
    }
  };

  const handleDeleteSupplier = async (id) => {
    try {
      await deleteSupplier(id);
      fetchSuppliers();
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  return (
    <div className="supplier-container">
      <h2>Supplier List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Person</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.name}</td>
              <td>{supplier.contactPerson}</td>
              <td>{supplier.phone}</td>
              <td>{supplier.email}</td>
              <td>{supplier.address}</td>
              <td>
                <button onClick={() => handleDeleteSupplier(supplier.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add Supplier</h3>
      <div className="supplier-form">
        <input
          type="text"
          placeholder="Name"
          value={newSupplier.name}
          onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contact Person"
          value={newSupplier.contactPerson}
          onChange={(e) => setNewSupplier({ ...newSupplier, contactPerson: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={newSupplier.phone}
          onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newSupplier.email}
          onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          value={newSupplier.address}
          onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
        />
        <button onClick={handleAddSupplier}>Add Supplier</button>
      </div>
    </div>
  );
};

export default SupplierList;
