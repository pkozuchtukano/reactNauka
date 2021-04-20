import React from 'react';


export default function TableRow({name, phone})
{
    return (
        <tr>
            <td>{name} Nazwa</td>
            <td>
                <div>tel.: {phone}</div>
                <div>email:</div>
            </td>
        </tr>
    )
}