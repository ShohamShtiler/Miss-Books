const { Link, Outlet } = ReactRouterDOM

export function AboutUs(){
    return (
        <section className="about-us">
            <p>
            Welcome to Miss Books, your go-to online bookstore for discovering and purchasing a wide selection of books.
            Whether you're a passionate reader or just looking for your next great read, we provide a seamless and enjoyable shopping experience.
            At Miss Books, we believe in the power of stories and knowledge, offering a carefully curated collection to suit all interests.
            Browse, explore, and buy your favorite books with ease.
            Happy reading! 📚✨
            </p>
            <nav>
                <Link to='/about/Team' className="about-team"><i ></i> Team |</Link>
                <Link to='/about/Goal' className="about-goal"><i ></i> Goal</Link>
            </nav>
            <Outlet />

        </section>
    )
}