import { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Form = () => {
  const [serviceData, setServiceData] = useState({
    serviceGroupId: '',
    price: '',
    capitalPrice: '',
    durationHour: '',
    durationMinute: '',
    name: '',
    code: '',
    description: '',
    canEditPriceInPay: false,
    image: '',
    showType: '',
    status: '',
    canPrintHouseInInvoice: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data
    console.log(serviceData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField name="serviceGroupId" label="Service Group ID" value={serviceData.serviceGroupId} onChange={handleChange} required />
      <TextField name="price" label="Price" type="number" value={serviceData.price} onChange={handleChange} required />
      <TextField name="capitalPrice" label="Capital Price" type="number" value={serviceData.capitalPrice} onChange={handleChange} />
      <TextField name="durationHour" label="Duration Hour" type="number" value={serviceData.durationHour} onChange={handleChange} required />
      <TextField name="durationMinute" label="Duration Minute" type="number" value={serviceData.durationMinute} onChange={handleChange} required />
      <TextField name="name" label="Name" value={serviceData.name} onChange={handleChange} required />
      <TextField name="code" label="Code" value={serviceData.code} onChange={handleChange} required />
      <TextField name="description" label="Description" value={serviceData.description} onChange={handleChange} multiline />
      </form>
  )}

  export default Form;