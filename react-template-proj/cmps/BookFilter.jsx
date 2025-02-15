import { utilService } from "../services/util.service.js"


const { useEffect, useState, useRef } = React


export function BookFilter({ filterBy, onFilterBy }) {


    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const initialFilterBy = useRef({ ...filterBy })


    const onSetFilterDebounce = useRef(utilService.debounce(onFilterBy, 1500))
    // const onSetFilterDebounce = utilService.debounce(onFilterBy, 1500)


    useEffect(() => {
        onSetFilterDebounce.current(filterByToEdit)
        // onSetFilterDebounce(filterByToEdit)
        // onFilterBy(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {
        let { name, type, value } = target
        if (type === 'number') value = +value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: value }))
    }


    function reset() {
        setFilterByToEdit(initialFilterBy.current)
    }


    function onSubmitForm(ev) {
        ev.preventDefault()
        onFilterBy(filterByToEdit)
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
