export function AppHeader({ onSetPage }) {
	return (
		<section className="app-header">
			
            <div className="logo" onClick ={ () => onSetPage(ev, 'home') }>
				Miss Books
			</div>

			<nav className="nav-bar">
				<a href="#" onClick={ () => onSetPage('home') }> Home </a>
				<a href="#" onClick={ () => onSetPage('book') }> Books </a>
				<a href="#" onClick={ () => onSetPage('about') }> About </a>
			</nav>
		</section>
	)
}