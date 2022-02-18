import { Col, Row, Divider, DatePicker, Checkbox, Modal,Card } from "antd";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsAction";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions.js";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import AOS from 'aos';

const { RangePicker } = DatePicker;
function BookingCar() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setdriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { carid } = useParams();


  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((B) => B._id === carid ));
    }

  }, [cars]);
  
  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + 30 * totalHours);
    }
  }, [driver, totalHours]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));

    setTotalHours(values[1].diff(values[0], "hours"));
  }

  

  function onToken(token){
    const reqObj = {
        token,
        user: JSON.parse(localStorage.getItem("user"))._id,
        car: car._id,
        totalHours,
        totalAmount,
        driverRequired: driver,
        bookedTimeSlots: {
          from,
          to,
        },
      };
  
      dispatch(bookCar(reqObj));
  }
  
  return<DefaultLayout>
  {loading && <Spinner />}
  <Row
    justify="center"
    className="d-flex align-items-center"
    style={{ minHeight: "90vh" }}
  >
    <Col lg={10} sm={24} xs={24} className='p-3'>
      <img src={car.image} className="carimg2 bs1 w-100 mr-2" data-aos='flip-left' data-aos-duration='1500'/>
    </Col>

    <Col lg={10} sm={24} xs={24} className="text-right">

    <div style={{ textAlign: "center"}}>
      <div className="carinfo">
      <Divider type="horizontal" dashed>
        Car Info
      </Divider>
      <div >
      <p>car brand : {car.brand}</p>
        <p>car model : {car.model}</p>
        <p> Rent Per hour : {car.rentPerHour} birr</p>
        <p>Fuel Type : {car.fuelType}</p>
        <p>Max Persons : {car.capacity}</p>
      </div>
      </div>
      <div className="booked">
      <Divider type="horizontal" dashed>
        Select Time Slots
      </Divider>
      <RangePicker
        showTime={{ format: "HH:mm" }}
        format="MMM DD yyyy HH:mm"
        onChange={selectTimeSlots}
      />
    
      
      <br />
      <button
        className="btn1 mt-2"
        onClick={() => {
          setShowModal(true);
        }}
      >
        See Booked Slots
      </button>
      </div>
      {from && to && (
        <div>
          <div className="totals">
          <p>
            Total Hours : <b>{totalHours}</b>
          </p>
          <p>
            Rent Per Hour : <b>{car.rentPerHour}</b>
          </p>
          <Checkbox
            onChange={(e) => {
              if (e.target.checked) {
                setdriver(true);
              } else {
                setdriver(false);
              }
            }}
          >
            Driver Required
          </Checkbox>

          <h3>Total Amount : {totalAmount} birr </h3>
       
          <StripeCheckout
            shippingAddress
            billingAddress
            token={onToken}
            bitcoin={true}
            currency='ETB'
            amount={totalAmount * 100}
            stripeKey="pk_test_51KRuUeFEw6JT16CIVG5OgtsF28sSge3SBvw9JCfB2yqOuTMk5Fhzqh5W44QEORKVQ14O37QZLxfwIBsIR72NuXuu00C7O03VEJ"
          >
              <button className="btn1">
            Book Now
          </button>
          </StripeCheckout>
</div>
          
        </div>
      )}
      </div>
    </Col>

    {car.model && (
      <Modal
        visible={showModal}
        closable={false}
        footer={false}
        title="Booked time slots"
      >
        <div className="p-2">
          {car.bookedTimeSlots.map((slot) => {
            return (       
              <button className="btn1 mt-2">
                {slot.from} - {slot.to}
              </button>
        
            );
          })}

          <div className="text-right mt-5">
            <button
              className="btn2"
              onClick={() => {
                setShowModal(false);
              }}
            >
              CLOSE
            </button>
          </div>
        </div>
      </Modal>
    )}
  </Row>
</DefaultLayout>;
}

export default BookingCar;
