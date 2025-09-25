import usersData from './inputData';
import React from 'react';
const DataTable = ()=>{
    const [users,setUsers]=React.useState(usersData);
    const headings = React.useMemo(()=>{
        const keys = Object.keys(users[0]);
        return keys;
    },[users])
    return <div>
        <table>
            <tr>
                {headings.map(heading=>{
                    return <th key={heading}>
                        {heading}
                    </th>
                })}
            </tr>
            {users.map(user=>{
                const values = Object.values(user)
                return <tr key={user.id}>
                    {values.map(val=>{
                        return <td key={val}>{val}</td>
                    })}
                </tr>
            })}
        </table>
    </div>
}
export default DataTable;