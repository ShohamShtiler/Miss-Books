
const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { HomePage } from './pages/Home.jsx'
import { AboutUs } from './pages/About.jsx'
import { BookIndex } from './pages/BookIndex.jsx'


import { AppHeader } from './cmps/AppHeader.jsx'
import { BookDetails } from './pages/BookDetails.jsx'


import { AboutTeam } from './cmps/AboutTeam.jsx'
import { AboutGoal } from './cmps/AboutGoal.jsx'



export function App() {
	return (
		<Router>
		   <section className="app">
			   <header>
				<AppHeader  />

			    </header>
			    <main>
				<Routes>
				  <Route path="/" element={<HomePage />} />
				  <Route path="/about" element={<AboutUs />} >
				        <Route path='/about/Team' element={<AboutTeam />} />
                        <Route path='/about/Goal' element={<AboutGoal />} />
                    </Route>

				  <Route path="/book" element={<BookIndex />} />
				  <Route path="/book/:bookId" element={<BookDetails />} />
				</Routes>
			   </main>
		    </section>
		</Router>
	)
}
