import HeadnavDetailProduct from '../headnav-detail-product';

const ContentProductLayout = ({ children }) => {
    return (
        <div
            style={{
                // height: '50vh',
                width: '89%',
                // display: 'flex',
                marginLeft: 'auto',
                marginRight: 'auto'

                // backgroundColor: 'red'
            }}
        >
            {/* <HeadnavDetailProduct /> */}
            {children}
        </div>
    );
};

export default ContentProductLayout;
