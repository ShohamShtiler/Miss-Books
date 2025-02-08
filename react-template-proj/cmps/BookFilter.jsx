const { useState, useEffect } = React

export function BookFilter({ onSetFilter, filterBy }) {
	const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

	useEffect(() => {
		onSetFilter(filterByToEdit)
	}, [filterByToEdit])

	function handleChange({ target }) {
		const field = target.name
		const value = target.type === 'number' ? +target.value : target.value
		setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
	}

	const { title, price } = filterByToEdit

	return (
		<section className="filter-container">
			<div className="filter-inside-container">
				<h2 className="filter-header">Filter books:</h2>
				<div className="books-filter">
					<div className="filter-section">
						<label htmlFor="byTitle">Title:</label>
						<input type="text" id="byTitle" name="title" value={title} onChange={handleChange} className="input" placeholder="Search by title..." />
					</div>

					<div className="filter-section">
						<label htmlFor="byAuthor">Price:</label>
						<input type="number" id="price" name="price" value={price || ''} onChange={handleChange} className="input" placeholder="Search by price" />
					</div>
				</div>
			</div>
		</section>
	)
}
