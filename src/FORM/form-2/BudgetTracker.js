import React, { useState } from 'react';
import { Table, FormControl, Button, Row, Col, Modal } from 'react-bootstrap'; // Import Modal component from react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './BudgetTracker.css';
import { useNavigate } from 'react-router-dom';


function BudgetTracker() {
  const [expenses, setExpenses] = useState([]);
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState(0);
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
  const [showProofModal, setShowProofModal] = useState(false); // State to control the visibility of the proof modal
  const [currentProofUrl, setCurrentProofUrl] = useState(''); // State to store the URL of the current proof
  const navigate = useNavigate();
  const addExpense = () => {
    const newExpense = {
      item,
      quantity,
      cost: parseFloat(cost),
      date,
      notes,
      proof: selectedFile // Attach the selected file to the expense object
    };
    setExpenses([...expenses, newExpense]);
    setItem('');
    setQuantity(0);
    setCost(0);
    setDate('');
    setNotes('');
    setSelectedFile(null); // Reset the selected file after adding expense
  };
  const deleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  const handleFileChange = (e) => {
    // Update the selected file state when a new file is selected
    setSelectedFile(e.target.files[0]);
  };

  const handleViewProof = (proofUrl) => {
    setCurrentProofUrl(proofUrl); // Set the URL of the proof to display
    setShowProofModal(true); // Show the proof modal
  };

  const calculateTotalCost = () => {
    return expenses.reduce((total, expense) => total + expense.cost * expense.quantity, 0);
  };
  const handSubmit = async (e) => {
    e.preventDefault();
    alert('Event saved successfully!');
    
  }
  return ( 
    <div>
    <form onSubmit={handSubmit} style={{margin:"0 0 50px 0"}}>
    <h1>Financial Details</h1>
    <div className="con">
      <Row className="my-4">
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Cost (₹)</th>
                <th>Date</th>
                <th>Notes</th>
                <th>Proof</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{expense.item}</td>
                  <td>{expense.quantity}</td>
                  <td>{expense.cost} ₹</td>
                  <td>{expense.date}</td>
                  <td>{expense.notes}</td>
                  <td>
                    {expense.proof && (
                      <Button variant="link" onClick={() => handleViewProof(URL.createObjectURL(expense.proof))}>View</Button>
                    )}
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => deleteExpense(index)}>Delete</Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>{expenses.length + 1}</td>
                <td>
                  <FormControl
                    type="text"
                    placeholder="Item"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                  />
                </td>
                <td>
                  <FormControl
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </td>
                <td>
                  <FormControl
                    type="number"
                    placeholder="Cost"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                  />
                </td>
                <td>
                  <FormControl
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </td>
                <td>
                  <FormControl
                    type="text"
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </td>
                <td style={{ alignContent:"center" ,justifyContent:"center" }}>
                  <label htmlFor="upload" className="btn btn-primary" >
                    Upload
                  </label>
                  <input id="upload" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                </td>
                <td>
                  <Button variant="primary" onClick={addExpense} style={{paddingLeft:"22px",paddingRight:"22px"}}>Add</Button>
                </td>
              </tr>
            </tbody>
          </Table>
          <div>
            <p>Total Cost: {calculateTotalCost()} ₹</p>
          </div>
        </Col>
      </Row>
      {/* Proof Modal */}
      <Modal show={showProofModal} onHide={() => setShowProofModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Proof</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={currentProofUrl} alt="Proof" style={{ maxWidth: '100%' }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProofModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
    <div className='submitBtn'>
    <Button type='submit' >Submit</Button>
    <Button onClick={() => navigate('/Evento')}>Back</Button>
    </div>
  </form>

  </div>
  );
}

export default BudgetTracker;
