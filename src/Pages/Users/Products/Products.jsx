import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './products.module.css';
import Pro from '../../../assets/Pro.png'
import ReactPaginate from 'react-paginate';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SpinnerCircular } from 'spinners-react';
export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [CurrentPage, setCurrentPage] = useState(1); 
  const [totalPage, setTotalPage] = useState(2);
  const [productCount, setProductCount] = useState(0);
  const [search, setSearch] = useState(""); 
  const [sort,setSort]=useState("")

  const getProducts = async (currentPage = 1, search = "",sort="asc") => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-node4.onrender.com/products?page=${currentPage}&limit=5&search=${search}&sort=${sort}`
      );
      setProducts(data.products);
      setProductCount(data.products.length); // Update product count
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1; 
    setCurrentPage(selectedPage);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value); 
  };

  const handleSearchSubmit = () => {
    setCurrentPage(1); 
    getProducts(1, search); 
  };

  useEffect(() => {
    getProducts(CurrentPage, search,sort); 
  }, [CurrentPage, search,sort]); 

  if (isLoading) {
    return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
       <SpinnerCircular size={60} thickness={100} speed={100} color="blue" secondaryColor="lightgray"/>;
    </div>)
   
  }

  return (
    <div className="container mt-4">
      <Row>
        <Col xs="auto">
          <Form.Control
            type="text"
            placeholder="Search"
            value={search} 
            onChange={handleSearchChange} 
            className="mr-sm-2"
          />
        </Col>
        <Col xs="auto">
          <Button 
            style={{ backgroundColor: "#1A1287", borderColor: "#1A1287" }}
            onClick={handleSearchSubmit} 
          >
            Submit
          </Button>
        </Col>
        <Form.Group as={Col} xs="auto">
  <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
    <option value="name-asc">Name (A-Z)</option>
    <option value="name-desc">Name (Z-A)</option>
  </Form.Select>
</Form.Group>
      </Row>



      <img src={Pro} className={styles.headerImage} />
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product._id}>
            <Card className={styles.card}>
              <Card.Img
                variant="top"
                src={product.mainImage?.secure_url}
                alt={product.name}
                className={styles.cardimgtop}
              />
              <Card.Body className={styles.cardBody}>
                <Card.Title className={styles.title}>{product.name}</Card.Title>
                <Link to={`/products/${product._id}`} className={styles.btn}>
                  Details
                </Link>
           
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={totalPage}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={styles.pagination}
        pageClassName={styles.page_item}
        pageLinkClassName={styles.page_link}
        activeClassName={styles.active}
        previousClassName={styles.prev_item}
        previousLinkClassName={styles.prev_link}
        nextClassName={styles.next_item}
        nextLinkClassName={styles.next_link}
        breakClassName={styles.break_item}
        breakLinkClassName={styles.break_link}
      />
    </div>
  );
}
