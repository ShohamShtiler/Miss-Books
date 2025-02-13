const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { AppHeader } from './cmps/AppHeader.jsx'

import { AboutUs } from './pages/About.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { HomePage } from './pages/Home.jsx'

export function App() {

	// const [page, setPage] = useState('book')

	// function onSetPage(page) {
	// 	setPage(page)
	// }

	return (
		<Router>
		   <section className="app">
			   <header>
				<AppHeader  />

			    </header>
			    <main>
				<Routes>
				  <Route path="/" element={<HomePage />} />
				  <Route path="/about" element={<AboutUs />} />
				  <Route path="/book" element={<BookIndex />} />
				  <Route path="/book/:bookId" element={<BookDetails />} />
				</Routes>
			   </main>
		    </section>
		</Router>
	)
}
