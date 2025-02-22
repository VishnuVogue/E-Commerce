import React, { useState,useContext,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets';
import RelatedProducts from '../Components/RelatedProducts';

function Product() {

  const {productId} = useParams();
  const {products,currency} = useContext(ShopContext)
  const [productData,setProductData] = useState(false);
  const [image,setImage] = useState('');
  const [size,setSize] = useState('');

  const fetchProductData = async()=>{

    products.map((item)=>{
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(()=>{
    fetchProductData();
  },[productId])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opactity-100'>
      {/* Product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justfy-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-8 cursor-pointer' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto ' />
          </div>
        </div>
            {/* Product info */}
            <div className="flex-1">
              <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
              <div className='flex items-center gap-1 mt-2'>
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_dull_icon} alt="" className="w-3 5" />
                <p className='pl-2'>(122)</p>
                </div>
                <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
                <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
                <div className='flex flex-col gap-4 my-8'>
                  <p>Select Size</p>
                  <div className='flex gap-2'>
                    {productData.sizes.map((item,index) => (
                      <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500':''} `} key={index}>{item}</button>
                    ))}
                  </div>
                  <button className='bg-black  text-white px-8 py-3 w-fit text-sm active:bg-gray-700'>ADD TO CART</button>
                  <hr className='mt-8 sm:w-4/5' />
                  <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                    <p>100% Original Product.</p>
                    <p>Cash on delivery available on this product</p>  
                  </div>
                </div>
            </div>

      </div>
                    {/* description and review section */}
            <div className="mt-20">
              <div className="flex">
                <b className='border px-5 py-3 text-sm'>Description</b>
                <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
              </div>
              <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
                    <p>An ecommerce is a digital marketplace where businesses can sell products and services to consumers via the internet. It offers convenience, accessibility, and a wide variety of goods. With features like secure payment methods and fast delivery, ecommerce has revolutionized shopping, allowing businesses to reach global audiences easily.</p>
                    <p>Ecommerce websites typically feature a user-friendly interface, allowing customers to browse products, read descriptions, and make purchases with ease. They include shopping carts, secure checkout systems, and payment options. With responsive design, these websites provide a seamless experience on both desktops and mobile devices, enhancing customer satisfaction and engagement.</p>
              </div>
            </div>

            {/* display related products */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory}></RelatedProducts>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product