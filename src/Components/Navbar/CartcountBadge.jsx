
// eslint-disable-next-line react/prop-types
const CartcountBadge = ({size}) => {
    return (
        <div className={`absolute bg-red-600 text-white text-[14px] ${size} -right-3 -top-1 rounded-full grid place-items-center `}>
           3 
        </div>
    );
};

export default CartcountBadge;