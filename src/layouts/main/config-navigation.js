import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------
const certificateItem={
      order: '1',
      subheader: 'Get Certificates',
      cover: '/assets/images/menu/menu_marketing.jpg',
      items: [
        { title: 'Retrieve Certificate', path: '/retrieve-certificate' },
      
    
      ],
    }
export const pageLinks = (data)=>{
  return data.map((val,i)=>({
    order:i+1,
    subheader:val.title,
    cover: '/assets/images/menu/menu_marketing.jpg',
    items:[{
      title:val.title,
      path:val.slug
    }]
    

  }))
 
}

export const navConfig = (data)=>{
  return [
    { title: 'Certificates', path: '/retrieve-certificate', children: [certificateItem] },
    { title: 'CEFBR', children:pageLinks(data) ,path:"/cefbr"},
    {
      title: 'Our Tests',
      path: '/Our Tests',
      // children: [],
    },
    { title: 'About Us', path: '/about-us' },
  ];
}
export const footerNavConfig = [
    { title: 'Certificates', path: '/retrieve-certificate', children: [] },
    { title: 'CEFBR', children:[] ,path:"/cefbr"},
    {
      title: 'Our Tests',
      path: '/Our Tests',
      // children: [],
    },
    { title: 'About Us', path: '/about-us' },
  ];



export const footerPageLinks = [
  {
    order: '1',
    subheader: 'Level A',
    cover: '/assets/images/menu/menu_marketing.jpg',
    items: [
      { title: 'A-1 Test', path: paths.marketing.root },
      { title: 'A-2 Test', path: paths.marketing.services },
      { title: 'Quick Check A-1', path: paths.marketing.caseStudies },
  
    ],
  },
  {
    order: '6',
    subheader: 'Travel',
    cover: '/assets/images/menu/menu_travel.jpg',
    items: [
      { title: 'Landing', path: paths.travel.root },
      { title: 'Tours', path: paths.travel.tours },
      { title: 'Tour', path: paths.travel.tour },
      { title: 'Checkout', path: paths.travel.checkout },
      { title: 'Order Completed', path: paths.travel.orderCompleted },
      { title: 'Blog Posts', path: paths.travel.posts },
      { title: 'Blog Post', path: paths.travel.post },
      { title: 'About', path: paths.travel.about },
      { title: 'Contact', path: paths.travel.contact },
    ],
  },
  {
    order: '2',
    subheader: 'Career',
    cover: '/assets/images/menu/menu_career.jpg',
    items: [
      { title: 'Landing', path: paths.career.root },
      { title: 'Jobs', path: paths.career.jobs },
      { title: 'Job', path: paths.career.job },
      { title: 'Blog Posts', path: paths.career.posts },
      { title: 'Blog Post', path: paths.career.post },
      { title: 'About', path: paths.career.about },
      { title: 'Contact', path: paths.career.contact },
    ],
  },
  {
    order: '5',
    subheader: 'E-learning',
    cover: '/assets/images/menu/menu_elearning.jpg',
    items: [
      { title: 'Landing', path: paths.eLearning.root },
      { title: 'Courses', path: paths.eLearning.courses },
      { title: 'Course', path: paths.eLearning.course },
      { title: 'Blog Posts', path: paths.eLearning.posts },
      { title: 'Blog Post', path: paths.eLearning.post },
      { title: 'About', path: paths.eLearning.about },
      { title: 'Contact', path: paths.eLearning.contact },
    ],
  },
  {
    isNew: true,
    order: '3',
    subheader: 'E-commerce',
    cover: '/assets/images/menu/menu_ecommerce.jpg',
    items: [
      { title: 'Landing', path: paths.eCommerce.root },
      { title: 'Products', path: paths.eCommerce.products },
      { title: 'Product', path: paths.eCommerce.product },
      { title: 'Cart', path: paths.eCommerce.cart },
      { title: 'Checkout', path: paths.eCommerce.checkout },
      { title: 'Order Completed', path: paths.eCommerce.orderCompleted },
      { title: 'Wishlist', path: paths.eCommerce.wishlist },
      { title: 'Compare', path: paths.eCommerce.compare },
      { title: 'Account Personal', path: paths.eCommerce.account.personal },
      { title: 'Account Wishlist', path: paths.eCommerce.account.wishlist },
      { title: 'Account Vouchers', path: paths.eCommerce.account.vouchers },
      { title: 'Account Orders', path: paths.eCommerce.account.orders },
      { title: 'Account Payment', path: paths.eCommerce.account.payment },
    ],
  },
  {
    order: '4',
    subheader: 'Common',
    items: [
      { title: 'Login Cover', path: paths.loginCover },
      { title: 'Login Illustration', path: paths.loginIllustration },
      { title: 'Login Background', path: paths.loginBackground },
      { title: 'Register Cover', path: paths.registerCover },
      { title: 'Register Illustration', path: paths.registerIllustration },
      { title: 'Register Background', path: paths.registerBackground },
      { title: 'Forgot Password', path: paths.forgotPassword },
      { title: 'Verify Code', path: paths.verify },
      { title: '404 Error', path: paths.page404 },
      { title: '500 Error', path: paths.page500 },
      { title: 'Maintenance', path: paths.maintenance },
      { title: 'ComingSoon', path: paths.comingsoon },
      { title: 'Pricing 01', path: paths.pricing01 },
      { title: 'Pricing 02', path: paths.pricing02 },
      { title: 'Payment', path: paths.payment },
      { title: 'Support', path: paths.support },
    ],
  },
];



// return [
//   {
//     order: '1',
//     subheader: 'Level A',
//     cover: '/assets/images/menu/menu_marketing.jpg',
//     items: [
//       { title: 'A-1 Test', path: paths.marketing.root },
//       { title: 'A-2 Test', path: paths.marketing.services },
//       { title: 'Quick Check A-1', path: paths.marketing.caseStudies },
  
//     ],
//   }
// ];