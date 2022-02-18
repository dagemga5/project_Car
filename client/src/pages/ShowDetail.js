import { Col, Row, Divider, DatePicker, Checkbox, Modal,Card } from "antd";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsAction";
import moment from "moment";

const { RangePicker } = DatePicker;
function ShowDetails() {
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


  
  return<DefaultLayout>
  {loading && <Spinner />}
  <Row
    justify="center"
    className="d-flex align-items-center"
    style={{ minHeight: "90vh" }}
  >
    <Col lg={10} sm={24} xs={24} className='p-3'>
      <img src={car.image} className="carimg2 bs1 w-100" data-aos='flip-left' data-aos-duration='1500'/>
    </Col>

    <Col lg={10} sm={24} xs={24} className="text-right">

    <div style={{ textAlign: "center"}}>
      <div className="carinfo">
      <Divider type="horizontal" dashed>
        Car Info
      </Divider>
      <div>
      <p>car brand : <b>{car.brand}</b></p>
        <p>car model : <b>{car.model}</b></p>
        <p> Rent Per hour :<b> {car.rentPerHour} birr</b></p>
        <p>Fuel Type : <b>{car.fuelType}</b></p>
        <p>Max Persons : <b>{car.capacity}</b></p>
      </div>
      </div>
      <div className="booked">
      <Divider type="horizontal" dashed>
        Booked Slots
      </Divider>
    
      
      <br />
      {car.model && (
      <div
      >
        <div >
          {car.bookedTimeSlots.map((slot) => {
            return (       
              <button className="btn1 mt-1">
                {slot.from} - {slot.to}
              </button>
        
            );
          })}
        </div>
      </div>
    )}
     
      </div>
      </div>
    </Col>

   
  </Row>
</DefaultLayout>;
}

export default ShowDetails;
