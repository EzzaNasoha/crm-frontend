import { useGetData } from '@/hooks/getData'
import Button from '@/components/Button'

const ImsiList = () => {
    const {
        data,
        loading,
        currentLastPage,
        setCurrentPage,
        deleteItemFromList,
    } = useGetData('/api/imsi')

    const deleteHandler = id => {
        let confirmDelete = confirm(
            `Do you want to delete the entry with id ${id}?`,
        )
        if (confirmDelete) {
            deleteItemFromList(id)
        }
    }

    let listItems = []
    if (!loading && data.length > 0) {
        listItems = data.map(d => {
            return (
                <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.imsi}</td>
                    <td>{d.pin}</td>
                    <td>{d.puk_1}</td>
                    <td>{d.puk_2}</td>
                    <td>
                        <Button onClick={() => deleteHandler(d.id)}>
                            Delete
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    const pageLinks = []
    for (let i = 1; i <= currentLastPage; i++) {
        pageLinks.push(
            <li
                key={i}
                id={'page-link-' + i}
                className="mr-2 cursor-pointer"
                onClick={() => setCurrentPage(i)}>
                {i}
            </li>,
        )
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <table className="w-full table-fixed">
                <thead>
                    <tr className="text-left">
                        <th>ID</th>
                        <th>Imsi</th>
                        <th>Pin</th>
                        <th>PUK1</th>
                        <th>PUK2</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{listItems}</tbody>
            </table>

            <div>
                <h2>Pages</h2>
                <ul className="flex items-center">{pageLinks}</ul>
            </div>
        </div>
    )
}

export default ImsiList
