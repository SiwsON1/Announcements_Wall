import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, Button } from 'react-bootstrap';

const SearchForm = () => {
    const navigate = useNavigate();
  const [searchPhrase, setSearchPhrase] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchPhrase}`);
    setSearchPhrase('');
  };

  return (
    <Form className="col-12 col-sm-3 mb-3 mx-auto d-flex justify-content-between"  onSubmit={handleSubmit}>
      <FormControl
        type="text"
        placeholder="Search"
        value={searchPhrase}
        onChange={(e) => setSearchPhrase(e.target.value)}
      />
      <Button type="submit" variant="outline-success" className="text-center" >Search</Button>
    </Form>
  );
};

export default SearchForm;