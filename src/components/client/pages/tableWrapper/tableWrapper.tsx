import React from 'react';
import TableRow from './tableRow/tableRow';
import { customers } from '../../../../services/fireBase.service'
import { isTemplateExpression } from 'typescript';

export default function TableWrapper() {
    return (
        <table>
            {
                customers.map( customer => (
                    <TableRow key={customer.name} {...customer} />
                ))
            }
        </table>
    )
};