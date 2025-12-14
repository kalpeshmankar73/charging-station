function Header() {
    return (
        <div className="header flex justify-between items-center h-16 shadow-lg bg-white p-4">
            <div className="img-container flex gap-2 items-center ">
                <img
                    className="w-16 sm:w-24"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3x5lGGUiUlFTc1qA6dtkOFXfYWRt9xO3t_g&s"
                    alt="logo-img"
                />
                <h2 className="font-semibold text-2xl text-sky-600">ChargePoint Pro</h2>
            </div>
            <div className="middle-div">
                <ul className="flex gap-4 sm:gap-12 ">
                    <li className="cursor-pointer">Home</li>
                    <li className="cursor-pointer">About</li>
                    <li className="cursor-pointer">Contact</li>
                </ul>
            </div>

        </div>
    );
}

export default Header;