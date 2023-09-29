import React,{useState} from 'react';
import './part2.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';



function LandingScreen() {
    const [inputValue, setInputValue] = useState('');
    const [displayedValue, setDisplayedValue] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setInputValue(value);
            setTimeout(() => {
                setDisplayedValue(value);
            }, 1500);  
        }
    };

  return (
    <div>
        <Navbar className="justify-content-between">
            <Form inline className="fornav">
                <Navbar.Text className="nt-active">Open</Navbar.Text>
                <Navbar.Text className="nt">Close</Navbar.Text>
                <Navbar.Text className="nt">Boost</Navbar.Text>
            </Form>
        </Navbar>
        <hr />
        <div className="black-div row">
        <div className="col-lg-6 text-col">
        <Form>
            <Form.Group className="mb-3" controlId="formBasicInput">
            <Form.Label>Select Asset</Form.Label>
            <Form.Select className="input" aria-label="Default select example">
                <option>ETH</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label>Borrow Amount</Form.Label>
                <p className="sideE">Max Held Amount: 200</p>
                <Form.Control className="input1" type="text" placeholder="Enter Supply Amount" value={inputValue}
        onChange={handleInputChange}/>
            </Form.Group>
            <Button className="ex-btn" variant="light" type="submit">
                Execute
            </Button>
        </Form>
        </div>
        <div className="col-lg-6">
            <div className="longcol">
            <label className="disp-value">{displayedValue}</label>
            </div>
            <div className="smallcol"></div>
        </div>

        
    </div>
    </div>
  )
}

export default LandingScreen;