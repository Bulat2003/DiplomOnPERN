import { Container } from "react-bootstrap";
import '../styles/mainPage.css';
import { observer } from "mobx-react-lite";
import DriversList from "../components/driversList";


const MainPage = observer(() => {
    return (
        <Container className="fullPage">
            <div className="slogan-container">
                <h1>DriveFlex - Мы Доставляем удовольствие!</h1>
            </div>
            <DriversList/>

        </Container>
    );
});

export default MainPage;
