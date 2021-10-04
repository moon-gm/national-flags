import GroupPage from '../components/groupPage'
import { useState, useEffect } from 'react'

const Group = () => {
    const [path, setPath] = useState('')
    useEffect(() => {
        const pathName = window.location.pathname
        const splitPath = pathName.split('/')
        setPath(splitPath[1])
    }, [])
    return path && <GroupPage group={path}/>
}
export default Group
