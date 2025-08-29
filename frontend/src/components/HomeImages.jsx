import Carousel from 'react-bootstrap/Carousel';
import img1 from '../assets/images/bg3.jpg'
import img2 from '../assets/images/bg5.jpg'
import img3 from '../assets/background.png'

export default function HomeImages() {
  return (
    <div className="py-16 bg-[#f8f8f8]">
      <Carousel>
        <Carousel.Item>
          <div className="relative w-full h-[520px] md:h-[600px]">
            <img
              src={img1}
              alt="First slide"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {/* Optional overlay */}
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div className="relative w-full h-[520px] md:h-[600px]">
            <img
              src={img2}
              alt="First slide"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {/* Optional overlay */}
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="relative w-full h-[520px] md:h-[600px]">
            <img
              src={img3}
              alt="First slide"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {/* Optional overlay */}
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
