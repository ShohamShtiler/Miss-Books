
const { NavLink } = ReactRouterDOM

export function AppHeader() {
	return (
		<section className="app-header">
			
            <div className="logo">
				Miss Books
			</div>

			<nav className="nav-bar">
				<NavLink to="/">Home</NavLink>
				<NavLink to="/about">About</NavLink>
				<NavLink to="/book">Books</NavLink>
			</nav>
		</section>
	)
}