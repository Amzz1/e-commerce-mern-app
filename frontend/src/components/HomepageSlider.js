import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {Link} from  "react-router-dom"
import image1 from "../assets/image67.png"
import image2 from "../assets/image84.png"
import image3 from "../assets/image73.png"

const HomepageSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return (
        <div > 
          <Slider {...settings}>
            <div className='single-slide'>
              <div>
                <div className='single-slide__info flex-column'>
                    <h1>Rest Assured</h1>
                    <p>This powerhouse eye cream visibly reduces dark circles while depuffing eyes for an always-well-rested look. 93% of users saw visible improvement in dark circles in 4 weeks of less!</p>
                    <button><Link to='product/category/best-seller'>Shop Rest Assured</Link></button>
                </div>
                <div className='single-slide_product'>
                    <div className='single-slide_product-img'>
                      <div className='img-wrapper'><img src={image1} alt='img'/>
                      </div>
                    </div>
                    <div className='single-slide_product-info'>
                        <span>Chaqueta</span>
                        <span>$19.99</span>
                    </div>
                </div>
                <div className='single-slide_upsell flex-column'>
                    <div>
                    <div className='img-wrapper'>
                        <img src={image2} alt='img'/>
                      </div>
                        <div>Bright idea</div>
                    </div>
                    <div>
                    <div className='img-wrapper'>
                        <img src={image3} alt='img'/>
                      </div>                    
                          <div>Block star</div>
                    </div>
                </div>
              </div>
            </div>
            <div className='single-slide'>
              <div>
                <div className='single-slide__info flex-column'>
                    <h1>Product 2</h1>
                    <p>This powerhouse eye cream visibly reduces dark circles while depuffing eyes for an always-well-rested look. 93% of users saw visible improvement in dark circles in 4 weeks of less!</p>
                    <button><Link to='product/category/best-seller'>Shop Rest Assured</Link></button>
                </div>
                <div className='single-slide_product'>
                    <div className='single-slide_product-img'>
                      <div className='img-wrapper'><img src={image1} alt='img'/>
                      </div>
                    </div>
                    <div className='single-slide_product-info'>
                        <span>Chaqueta</span>
                        <span>$19.99</span>
                    </div>
                </div>
                <div className='single-slide_upsell flex-column'>
                    <div>
                    <div className='img-wrapper'>
                        <img src={image2} alt='img'/>
                      </div>
                        <div>Bright idea</div>
                    </div>
                    <div>
                    <div className='img-wrapper'>
                        <img src={image3} alt='img'/>
                      </div>                    
                          <div>Block star</div>
                    </div>
                </div>
              </div>
            </div>
            <div className='single-slide'>
              <div>
                <div className='single-slide__info flex-column'>
                    <h1>Collection 3</h1>
                    <p>This powerhouse eye cream visibly reduces dark circles while depuffing eyes for an always-well-rested look. 93% of users saw visible improvement in dark circles in 4 weeks of less!</p>
                    <button><Link to='product/category/best-seller'>Shop Rest Assured</Link></button>
                </div>
                <div className='single-slide_product'>
                    <div className='single-slide_product-img'>
                      <div className='img-wrapper'><img src={image1} alt='img'/>
                      </div>
                    </div>
                    <div className='single-slide_product-info'>
                        <span>Chaqueta</span>
                        <span>$19.99</span>
                    </div>
                </div>
                <div className='single-slide_upsell flex-column'>
                    <div>
                    <div className='img-wrapper'>
                        <img src={image2} alt='img'/>
                      </div>
                        <div>Bright idea</div>
                    </div>
                    <div>
                    <div className='img-wrapper'>
                        <img src={image3} alt='img'/>
                      </div>                    
                          <div>Block star</div>
                    </div>
                </div>
              </div>
            </div>
          
               
        
          </Slider>
        </div>
      );

}

export default HomepageSlider