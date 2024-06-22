import ab from '../assets/aboutUs.svg';
import dr from '../assets/drivers.svg';
import com from '../assets/communication.svg';
import sup from '../assets/support.svg';
import '../styles/about.css'
const About = () => {
    return (
        <div className="about-container">
            <div className="about-us">
                <img src={ab} alt="about"/>
                <div className="inner-text">
                    <h2 className="main-text">О НАС</h2>
                    <p className="second-text">DriveFlex - это название не только компании, но и частичка нашего сердца!
                        Мы уже много лет занимаемся грузовыми перевозками.
                        Наша компания - лидер в этой отрасли. Мы помогаем не только заказчикам,
                        но и нашим любимым водителям. Ведь лишь благодаря им мы так хорошо себя зарекомендовали.
                        Мы работаем с людьми по всей России. Вскоре будем работать и со странами СНГ! Так что DriveFlex - это будущее!</p>
                </div>
            </div>
            <div className="drivers">
                <div className="inner-text">
                    <h2 className="main-text">ВОДИТЕЛИ</h2>
                    <p className="second-text p-text">В нашей компании работают лишь профессионалы своего дела.
                        У каждого из наших водителей многолетний опыт перевозок за плечами.
                        Каждый из них проверяет квалификацию каждый год.
                        Также в нашем распоряжении огромный автопарк разной техники.
                        Именно благодаря их силе воли и поддержке вы наслаждаетесь исполненными задачами, а мы наслаждаемся вашими добрыми пожеланиями.</p>
                </div>
                <img src={dr} alt="driver"/>
            </div>
            <div className="communication">
                <img src={com} alt="communication"/>
                <div className="inner-text">
                    <h2 className="main-text">СВЯЗЬ</h2>
                    <p className="second-text">Если вы очень переживаете за свой груз, то в любой удобный момент можете позвонить нашим водителям и все подробно разузнать.
                        Также водители легко смогут выйти с вами на связь, если прибыли раньше или если возникли какие-то вопросы по поводу доставки вашего груза.</p>
                </div>
            </div>
            <div className="supports">
                <div className="inner-text">
                    <h2 className="main-text">ПОДДЕРЖКА</h2>
                    <p className="second-text p-text">У нас есть круглосуточная поддержка как для водителей, так и для клиентов. По любым вопросам вы можете позвонить оп одному из номеров горячей линии и узнать все - что
                        Вас интересует.
                        <br/>Например, подробности доставки. Мы очень любим своих клиентов и сильно ценим водителей! Так
                        что всегда к Вашим услугам!</p>
                </div>
                <img src={sup} alt="support"/>
            </div>
        </div>
    );
};
export default About;