import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Form, Modal, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchDrivers } from "../http/driversAPI";
import car from "../assets/car.svg";
import filtered from '../assets/filtersButton.svg';
import Order from "./modals/Order";
import listImg from '../assets/listButton.svg';
import "../styles/mainPage.css";
import noDrivers from "../assets/noCars.jpg";
import errors from "../assets/Error.jpg";

const DriversList = observer(() => {
    const { drivers: contextDrivers, cars } = useContext(Context);
    const [localDrivers, setLocalDrivers] = useState([]);
    const [filters, setFilters] = useState({
        filter: "",
        payloadFilter: ""
    });
    const [modals, setModals] = useState({
        isOrderModalOpen: false,
        showWarning: false
    });
    const [selectedDriverId, setSelectedDriverId] = useState(null);

    useEffect(() => {
        const fetchDriversData = async () => {
            try {
                const driversData = await fetchDrivers();
                setLocalDrivers(driversData);
            } catch (error) {
                console.error("Ошибка при загрузке водителей:", error);
            }
        };

        fetchDriversData();
    }, []);

    const startPrice = 12500;
    const insurancePrice = 10000;

    const calculateTotalPrice = (driver) => {
        const payload = driver.Car ? driver.Car.Payload : 0;
        return startPrice * payload + insurancePrice;
    };

    const calculateAdvancePayment = (driver) => {
        return calculateTotalPrice(driver);
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const filteredDrivers = useMemo(() => {
        let filtered = [...localDrivers];

        if (filters.payloadFilter) {
            filtered = filtered.filter(driver => driver.Car && driver.Car.Payload === parseFloat(filters.payloadFilter));
        }

        if (filters.filter === "priceHighToLow") {
            filtered.sort((a, b) => calculateTotalPrice(b) - calculateTotalPrice(a));
        } else if (filters.filter === "priceLowToHigh") {
            filtered.sort((a, b) => calculateTotalPrice(a) - calculateTotalPrice(b));
        }

        return filtered;
    }, [localDrivers, filters]);

    const openOrderModal = (driverId) => {
        const selectedDriver = localDrivers.find(driver => driver.id === driverId);
        if (selectedDriver && selectedDriver.Car) {
            setSelectedDriverId(driverId);
            setModals((prevModals) => ({ ...prevModals, isOrderModalOpen: true }));
        } else {
            setModals((prevModals) => ({ ...prevModals, showWarning: true }));
        }
    };

    const closeOrderModal = () => {
        setModals((prevModals) => ({ ...prevModals, isOrderModalOpen: false }));
        setSelectedDriverId(null);
    };

    const closeWarningModal = () => {
        setModals((prevModals) => ({ ...prevModals, showWarning: false }));
    };

    return (
        <div className="offers-container">
            <div className="controls-container">
                <Form className="control">
                    <img className="control" src={listImg} alt="list" width="24px" height="24px" />
                    <Form.Select
                        className="control"
                        name="filter"
                        value={filters.filter}
                        onChange={handleFilterChange}
                    >
                        <option className="control" value="priceHighToLow">По убыванию цены</option>
                        <option className="control" value="priceLowToHigh">По возрастанию цены</option>
                    </Form.Select>
                </Form>
                <Form className="control">
                    <img className="control" src={filtered} alt="filter" width="24px" height="24px" />
                    <Form.Select
                        className="control"
                        name="payloadFilter"
                        value={filters.payloadFilter}
                        onChange={handleFilterChange}
                    >
                        <option className="control" value="">Все грузоподъемности</option>
                        <option className="control" value="3">3 тонны</option>
                        <option className="control" value="5">5 тонн</option>
                        <option className="control" value="10">10 тонн</option>
                        <option className="control" value="20">20 тонн</option>
                    </Form.Select>
                </Form>
            </div>
            {filteredDrivers.length > 0 ? filteredDrivers.map(driver => (
                <div className="offer" key={driver.id}>
                    <img src={car} alt="car" />
                    <div className="offer-info">
                        <p className="name">ИП {driver.FirstName}</p>
                        <p className="payload">
                            {driver.Car ? `${driver.Car.Payload} тонн` : 'Нет данных'}
                        </p>
                    </div>
                    <div className="offer-price">
                        <p className="payload">Сумма доставки</p>
                        <p className="name">{calculateTotalPrice(driver)}</p>
                    </div>
                    <div className="offer-price">
                        <p className="payload">Страховка</p>
                        <p className="name">{insurancePrice}</p>
                    </div>
                    <div className="offer-price">
                        <p className="payload">Предоплата</p>
                        <p className="name">{calculateAdvancePayment(driver)}</p>
                    </div>
                    <button className="button cssbuttons-io-button" onClick={() => openOrderModal(driver.id)}>
                        Заказать
                        <div className="icon">
                            <svg
                                height="24"
                                width="24"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path
                                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                        </div>
                    </button>
                </div>
            )) : (
                <div className="no-cars-div">
                    <img src={noDrivers} alt="no_cars" height="400px" width="460px" />
                    <h5>На данный момент машин данной категории нет.</h5>
                </div>
            )}

            <Order show={modals.isOrderModalOpen} onHide={closeOrderModal} selectedDriverId={selectedDriverId} />

            <Modal show={modals.showWarning} onHide={closeWarningModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Недоступно</Modal.Title>
                </Modal.Header>
                <Modal.Body className="no-order-div">
                    <img src={errors} alt="error" height="400px" width="400px" />
                    <h6>На данный момент этот транспорт заказать нельзя.</h6>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={closeWarningModal}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
});

export default DriversList;
