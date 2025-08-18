const Filter = ({ searchName, filterPersons }) => {
    return (
        <>
            filter shown with <input value={searchName} onChange={filterPersons} />
        </>
    )
}
export default Filter