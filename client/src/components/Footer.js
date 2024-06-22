import React from 'react';
import "../styles/footer.css"
import logo from "../assets/OIG 1.svg";
import VK from "../assets/VK.svg"
import telegram from "../assets/telegram.svg"
import phone from "../assets/phone.svg"
import email from "../assets/mail.svg"
import line from "../assets/footerLine.svg"
import {observer} from "mobx-react-lite";

const Footer = observer(() => {
    return (
        <div className="footer-container">
            <img src={line} alt="line" className="footer-line"/>
            <div className="footer-content">
                <div className="footer-section">
                    <div className="footer-drive-flex-container">
                        <img src={logo} alt="logo" className="footer-rounded-image"/>
                        <p className="footer-brand-heading text">DriveFlex</p>
                    </div>
                    <div className="footer-text">
                        <p className="text">© 2024, ООО «DriveFlex» <br/>Все права защищены.</p>
                    </div>
                </div>
                <div className="footer-contact-info">
                    <div className="footer-social-media">
                        <img src={VK} alt="VK" className="footer-social-icon"/>
                        <img src={email} alt="mail" className="footer-social-icon"/>
                        <img src={telegram} alt="telegram" className="footer-social-icon"/>
                        <img src={phone} alt="phoneNumber" className="footer-social-icon"/>
                    </div>
                    <div className="footer-customer-service">
                        <p className="text">Служба заботы о клиентах</p>
                    </div>
                    <div className="footer-contact-details">
                        <p>+7 (987) 554-55-94</p>
                        <p>+7 (987) 244-55-94</p>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default Footer;
