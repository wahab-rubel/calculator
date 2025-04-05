import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaVk, FaWhatsapp } from 'react-icons/fa';
import { SiAlipay } from 'react-icons/si';
import { IoIosArrowUp } from 'react-icons/io';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 text-gray-700 text-sm">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4">
        <div>
          <h6 className="font-semibold mb-2">Customer service</h6>
          <ul>
            <li className="mb-1"><Link href="#">Help Center</Link></li>
            <li className="mb-1"><Link href="#">Transaction Services Agreement for non-EU/UK Consumers</Link></li>
            <li className="mb-1"><Link href="#">Terms and Conditions for EU/EEA/UK Consumers (Transactions)</Link></li>
            <li className="mb-1"><Link href="#">Take our feedback survey</Link></li>
            <li className="mb-1"><Link href="#">Help</Link></li>
            <li className="mb-1"><Link href="#">Help Center . Disputes & Reports . Buyer Protection . Report IPR infringement . Regulated Information . Integrity Compliance Transparency Center . Submit report (non-registered users)</Link></li>
          </ul>
        </div>
        <div>
          <h6 className="font-semibold mb-2">Shopping with us</h6>
          <ul>
            <li className="mb-1"><Link href="#">Making payments</Link></li>
            <li className="mb-1"><Link href="#">Delivery options</Link></li>
            <li className="mb-1"><Link href="#">Buyer Protection</Link></li>
          </ul>
        </div>
        <div>
          <h6 className="font-semibold mb-2">Collaborate with us</h6>
          <ul>
            <li className="mb-1"><Link href="#">Partnerships</Link></li>
            <li className="mb-1"><Link href="#">Affiliate program</Link></li>
            <li className="mb-1"><Link href="#">DS Center</Link></li>
            <li className="mb-1"><Link href="#">Seller Log In</Link></li>
            <li className="mb-1"><Link href="#">中国 卖家 入口</Link></li>
            <li className="mb-1"><Link href="#">Non-Chinese Seller Registration</Link></li>
          </ul>
        </div>
        <div>
          <h6 className="font-semibold mb-2">Pay with</h6>
          <div className="flex items-center space-x-2">
            <img src="https://img.alicdn.com/tfs/TB1X1.jXFXXXXX3XFXXXXXXXXXX-28-17.svg" alt="Visa" className="h-4" />
            <img src="https://img.alicdn.com/tfs/TB1Qv0RXFXXXXXbaFXXXXXXXXXX-28-17.svg" alt="Mastercard" className="h-4" />
            <img src="https://img.alicdn.com/tfs/TB1z70RXFXXXXX6aXXXXXXXXXX-28-17.svg" alt="Maestro" className="h-4" />
            <img src="https://img.alicdn.com/tfs/TB11L0RXFXXXXX7aXXXXXXXXXX-28-17.svg" alt="American Express" className="h-4" />
            <SiAlipay className="h-4 w-auto" />
          </div>
        </div>
        <div>
          <h6 className="font-semibold mb-2">Stay connected</h6>
          <div className="flex items-center space-x-3">
            <Link href="#" className="hover:text-blue-500"><FaFacebookF size={20} /></Link>
            <Link href="#" className="hover:text-blue-400"><FaTwitter size={20} /></Link>
            <Link href="#" className="hover:text-pink-500"><FaInstagram size={20} /></Link>
            <Link href="#" className="hover:text-red-600"><FaYoutube size={20} /></Link>
            <Link href="#" className="hover:text-blue-700"><FaVk size={20} /></Link>
            <Link href="#" className="hover:text-green-500"><FaWhatsapp size={20} /></Link>
          </div>
        </div>
        <div>
          <h6 className="font-semibold mb-2">AliExpress Multi-Language Sites</h6>
          <ul>
            <li className="mb-1"><Link href="#">Russian</Link></li>
            <li className="mb-1"><Link href="#">Portuguese</Link></li>
            <li className="mb-1"><Link href="#">Spanish</Link></li>
            <li className="mb-1"><Link href="#">French</Link></li>
            <li className="mb-1"><Link href="#">German</Link></li>
            <li className="mb-1"><Link href="#">Italian</Link></li>
            <li className="mb-1"><Link href="#">Dutch</Link></li>
            <li className="mb-1"><Link href="#">Turkish</Link></li>
            <li className="mb-1"><Link href="#">Japanese</Link></li>
            <li className="mb-1"><Link href="#">Korean</Link></li>
            <li className="mb-1"><Link href="#">Thai</Link></li>
            <li className="mb-1"><Link href="#">Vietnamese</Link></li>
            <li className="mb-1"><Link href="#">Arabic</Link></li>
            <li className="mb-1"><Link href="#">Hebrew</Link></li>
            <li className="mb-1"><Link href="#">Polish</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 border-t border-gray-300 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h6 className="font-semibold mb-1">Browse by Category</h6>
          <p className="text-gray-600">All Popular Product, Promotion, Low Price, Great Value, Reviews, Blog, Video</p>
        </div>
        <div>
          <h6 className="font-semibold mb-1">Alibaba Group</h6>
          <p className="text-gray-600">
            <Link href="#" className="mr-2">Alibaba Group Website</Link>
            <Link href="#" className="mr-2">AliExpress</Link>
            <Link href="#" className="mr-2">Alimama</Link>
            <Link href="#" className="mr-2">Alipay</Link>
            <Link href="#" className="mr-2">Fliggy</Link>
            <Link href="#" className="mr-2">Alibaba Cloud</Link>
            <Link href="#" className="mr-2">Alibaba International</Link>
            <Link href="#" className="mr-2">AliTelecom</Link>
            <Link href="#" className="mr-2">DingTalk</Link>
            <Link href="#" className="mr-2">Juhuasuan</Link>
            <Link href="#" className="mr-2">Taobao Marketplace</Link>
            <Link href="#" className="mr-2">Tmall</Link>
            <Link href="#" className="mr-2">Taobao Global</Link>
            <Link href="#" className="mr-2">AliOS</Link>
            <Link href="#">1688</Link>
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-6 text-center text-gray-600">
        <p>&copy; 2023 AliExpress. All rights reserved.</p>
      </div>
      {/* Back to top button */}
      <div className="fixed bottom-4 right-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-2 rounded-full shadow">
          <IoIosArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
};

// You would need to import Link from your routing library (e.g., react-router-dom)
const Link = ({ href, children }) => <a href={href}>{children}</a>;

export default Footer;