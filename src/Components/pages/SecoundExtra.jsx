
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
const SecondExtra = () => {
    useEffect(() => {
        AOS.init();
      }, []);

  return (
    <div className="py-12 md:py-24"  data-aos="zoom-in-right"
    onMouseEnter={() => AOS.refresh()}>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative">
        <div className="shadow rounded-xl">
          <div className="grid overflow-hidden text-white shadow-xl md:grid-cols-2 bg-blue-600 rounded-xl">
            <aside className="p-8 space-y-4 md:p-16">
              <h2 className="text-2xl font-bold tracking-tight md:text-4xl font-headline">
                OPEN BOX LAPTOPS
              </h2>
              <p className="font-medium text-blue-100 md:text-2xl">
                These items are fresh and unused, though their seals have been
                opened. The actual product is in pristine condition, equivalent
                to a new item, having undergone thorough testing by our expert
                teams. The outer packaging might exhibit minor wear. Each item
                is backed by a 1-Year Warranty, with the battery and adapter
                covered for 3 months.{" "}
              </p>
              <div>
                <a
                  href="/"
                  className="bg-white text-blue-600 px-4 py-2 mt-3 rounded-xl"
                >
                  View More
                </a>
              </div>
            </aside>
            <aside className="relative hidden md:block">
              <img
                className="absolute inset-0 object-cover object-left-top w-full h-full mt-16 -mr-16 rounded-tl-lg"
                src="https://i.ibb.co/dfj243Q/austin-distel-Imc-Io-ZDMXc-unsplash-1.jpg"
                alt="Discover our beautiful panel"
              />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondExtra;
