
const ErrorPage = () => {
    return (
        <div>
             <section className="bg-white py-10 font-serif">
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="w-10/12 text-center">
                        <div className="bg-cover bg-center h-96" style={{ backgroundImage: "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)" }}>
                            <h1 className="text-7xl text-white">404</h1>
                        </div>
                        <div className="mt-16">
                            <h3 className="text-5xl font-bold">Looks like you're lost</h3>
                            <p>The page you are looking for is not available.</p>
                            <a href="/" className="text-white bg-green-500 px-8 py-4 mt-8 inline-block">Go to Home</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
};

export default ErrorPage;