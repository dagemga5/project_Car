import React , {useEffect, useState} from 'react';
import DefaultLayout from '../components/DefaultLayout';
import {useSelector , useDispatch} from 'react-redux'
import { deleteCar,getAllCars } from '../redux/actions/carsAction';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { Popconfirm, message } from "antd";
import { DeleteFilled, EditFilled ,EyeTwoTone ,PlusCircleFilled} from '@ant-design/icons'
import {Row , Col} from 'antd';

function AdminHome() {
  
  const {cars} = useSelector(state => state.carsReducer)
  const {loading} = useSelector(state=>state.alertsReducer)
 const [totalCars ,  setTotalCars] = useState([]);
  const dispatch = useDispatch();

 useEffect(() => {
 dispatch(getAllCars())
 }, [dispatch])

 useEffect(() => {
   setTotalCars(cars)
 }, [cars])
 
 
  return (
    <DefaultLayout>
      <h3 className='multicolortext'>Admin Panel</h3>
      <Row justify="center" gutter={16} className="mt-2">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2"></h3>
            <button className="btn1">
              <a href="/addcar">ADD CAR</a>
            </button>
          </div>
        </Col>
      </Row>

     {loading === true && (<Spinner/>)}


     
     <Row justify='center' gutter={16}>

          {totalCars.map(car=>{
              return <Col lg={5} sm={24} xs={24}>
                   <div className="car p-2 bs1">
                      <img src={car.image} className="carimg"/>

                      <div className="car-content d-flex align-items-center justify-content-between">

                           <div className='text-left pl-2'>
                               <b>
                               <p> Brand : {car.brand}</p>
                               <p> Model : {car.model} </p>
                               <p> Rent Per Hour : {car.rentPerHour} </p>
                               </b>
                           </div>

                           <div className='mr-4'>
                           <Link to={`/details/${car._id}`}> <EyeTwoTone className='mr-3' /> </Link>
                           <Link to={`/editcar/${car._id}`}> <EditFilled className='mr-3' style={{color: 'yellowgreen' , cursor:'pointer'}}/> </Link>
                           <Popconfirm
                      title="Are you sure to delete this car?"
                      onConfirm={()=>{dispatch(deleteCar({carid : car._id}))}}
                      
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteFilled
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Popconfirm> 
                           </div>

                      </div>
                   </div>
              </Col>
          })}

     </Row>

</DefaultLayout>

  )}

export default AdminHome;
