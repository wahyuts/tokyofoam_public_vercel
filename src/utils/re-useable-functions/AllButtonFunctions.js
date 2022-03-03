import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setMainURL } from '../../redux/actions/urlOnHeadnavActions';
import { settingKurirName } from '../../redux/actions/seputarOngkirAction';
import { addShippingFee } from '../../redux/actions/dataProductActions';
import { clearErrorCheckoutButton } from '../../redux/actions/userActions';

const AllButtonFunctions = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    //Go to sign in sidebar function
    const handleClickSignIn = (e) => {
        e.preventDefault();
        router.push('/test-sign-in');
    };

    //Function Go to how to buy page
    const handleClickHowToBuy = (e) => {
        dispatch(setMainURL('How To Buy'));
        e.preventDefault();
        router.push('/how-to-buy');
    };

    //Function Go to home page
    const handleClickHome = (e) => {
        dispatch(setMainURL('Home'));
        dispatch(clearErrorCheckoutButton());
        e.preventDefault();
        router.push('/');
    };

    //Function Go to aboutus page
    const handleClickAboutUs = (e) => {
        dispatch(setMainURL('About Us'));
        e.preventDefault();
        router.push('/about-us');
    };

    //Function Go to product page
    const handleClickProductPage = (e) => {
        dispatch(setMainURL('Product'));
        e.preventDefault();
        router.push('/product-page');
    };

    //Function Go to detail product page
    const handleClickDetailProduct = (e) => {
        e.preventDefault();
        router.push(`/product-page/1`);
    };

    //Function Go to ContactUs page   href={`/product-page/${ninja.id}`}
    const handleClickContactUs = (e) => {
        dispatch(setMainURL('Contact Us'));
        e.preventDefault();
        router.push('/contact-us');
    };

    //Function Go to ContactUs page   href={`/product-page/${ninja.id}`}
    const handleClickCart = (e) => {
        dispatch(setMainURL('Cart'));
        dispatch(settingKurirName(''));
        dispatch(addShippingFee(0));
        dispatch(clearErrorCheckoutButton());
        e.preventDefault();
        router.push('/cart');
    };

    //Function Go to Whistlist page
    const handleClickWishlistPage = (e) => {
        e.preventDefault();
        router.push('/wishlist-page');
    };

    //Function Go to Whistlist page
    const handleClickProfilePage = (e) => {
        dispatch(setMainURL('Profile'));
        e.preventDefault();
        router.push('/profile');
    };

    //Function Go to Register page MOBILE VERSION
    const handleClickGoToRegisterPage = (e) => {
        e.preventDefault();
        router.push('/mobile-register-member');
    };

    const handleClickTesting = (e) => {
        e.preventDefault();
        router.push('/testing');
    };

    // Function Go to homepage
    // const handleClickRegister = e => {
    //     e.preventDefault();
    //     router.push('/')
    // }

    // this return is for return all of function that have been dclare above
    // if we declare function without return it,..then the function wont be able to used it form othe paage
    return {
        handleClickSignIn,
        handleClickHowToBuy,
        handleClickHome,
        handleClickAboutUs,
        handleClickContactUs,
        handleClickProductPage,
        handleClickWishlistPage,
        handleClickProfilePage,
        handleClickGoToRegisterPage,
        handleClickTesting,
        handleClickDetailProduct,
        handleClickCart
    };
};

export default AllButtonFunctions;
