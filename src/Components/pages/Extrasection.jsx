import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

const Extrasection = () => {
    useEffect(() => {
        AOS.init();
      }, []);
    return (
        <div className="bg-gray-100 p-6 rounded-md border border-gray-300 m-4"  data-aos="zoom-in-right"
        onMouseEnter={() => AOS.refresh()}>
            <h2 className="text-2xl font-bold mb-4">
                Welcome to the Largest Gadget Shop in Bangladesh
            </h2>
            <p className="text-lg mb-4">
                We bring in the most sought-after gadgets at Star Tech. Only genuine and leading brands of Smart Watch, Earbuds, TV, Power Bank, and Mobile Phone Accessories are available at our Gadget Shop.
            </p>
            <p className="text-lg mb-4">
                We are also concerned for creative professionals for whom we bring exciting gadgets like Drones, Studio Equipment, DSLR Camera, Gimbals & Stream Decks from internationally reputed brands like DJI, Blackmagic, Corsair, Zhiyun, Gudsen, and Loupedeck.
            </p>
            <p className="text-lg mb-4">
                Star Tech has established the largest gadget shop in BD with the help of an app & E-commerce website. Ease up your chores with Daily Lifestyle gadgets from our gadget shop.
            </p>
            <p className="text-lg">
                Xiaomi, Hp, Dell, Samsung, Apple, OnePlus, Apple, Asus, Orico, Havit,  and HOCO are a few of the brands we cover.
            </p>
        </div>
    );
};

export default Extrasection;
