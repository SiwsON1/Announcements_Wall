import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import Spinner from 'react-bootstrap/Spinner';

const AdForm = ({ action, actionText, ...props }) => {
    
  const [title, setTitle] = useState(props.title || '');
  const [content, setContent] = useState(props.content || '');
  const [date, setDate] = useState(props.date || '');
  const [image, setImage] = useState(props.image || null);
  const [price, setPrice] = useState(props.price || 0);
  const [location, setLocation] = useState(props.location || '');
  const [user, setUser] = useState(props.user || '');
  const [loading, setLoading] = useState(false);
  

  const [dateError, setDateError] = useState(false);
  
  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  const handleSubmit = async () => {
    setDateError(!date);
    if (date) {
      setLoading(true);
      try {
        await action({ title, content, date, image, price, location, user });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  return (
      <Form className="col-12 col-sm-3 mx-auto" onSubmit={validate(handleSubmit)}>

        {loading && 
        <Spinner animation="border" role="status" className="block mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>}

        <Form.Label>Title</Form.Label>
            <Form.Control 
            {...register("title", { required: true, minLength: 10, maxLength: 50 })} 
            className="mb-3" 
            value={title} 
            placeholder="Enter Title" 
            type="text" 
            onChange={e => setTitle(e.target.value)} />
            {errors.title && <small className="d-block form-text text-danger mt-2">This field is required and must contain at least 10 letters</small>}

        <Form.Label>Content</Form.Label>
            <Form.Control 
            {...register("content", { required: true, minLength: 20, maxLength: 1000 })}
            as="textarea" 
            rows={4}  
            className="mb-3" 
            value={content} 
            placeholder="Leave a comment here..." 
            type="text" 
            onChange={e => setContent(e.target.value)} />
            {errors.content && <small className="d-block form-text text-danger mt-2">This field is required and must contain at least 20 letters</small>}  
          
        <Form.Label>Date</Form.Label>
            <Form.Control 
            className="mb-3"
            placeholder="Select date"
            value={date} 
            type="date"
            onChange={e => setDate(e.target.value)} />
            {dateError && <small className="d-block form-text text-danger mt-2">Wrong date format</small>}


        <Form.Label>Image</Form.Label>
            <Form.Control
            {...register('image', { required: !props.image })}
            className="mb-3"  
            type="file" 
            onChange={e => setImage(e.target.files[0])} />
            {errors.image && <small className="d-block form-text text-danger mt-2">You need to ad an image</small>}

        <Form.Label>Price</Form.Label>
            <Form.Control 
            {...register("price", { required: true, min: 1})} 
            className="mb-3" 
            value={price} 
            placeholder="Select your price" 
            type="number" 
            onChange={e => setPrice((e.target.value))} />
            {errors.price && <small className="d-block form-text text-danger mt-2">Price can't be set at 0</small>}    

        <Form.Label>Location</Form.Label>
            <Form.Control 
            {...register("location", { required: true})} 
            className="mb-3" 
            value={location} 
            placeholder="Select your address" 
            type="text" 
            onChange={e => setLocation(e.target.value)} />
            {errors.location && <small className="d-block form-text text-danger mt-2">This field is required</small>}  

        <Button type="submit" className="border border-none bg-primary rounded py-1 mt-1">
            <p className="text-light m-0">{actionText}</p>
        </Button>

      </Form>
    );
  };
  
    export default AdForm;