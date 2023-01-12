import React from 'react'

export default function Table(props) {
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Item</th>
                    <th>Order</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
            {
                props.final && props.final.map((element, i) => {
                    return(<tr key={i+1}>
                        <td>{i+1}</td>
                        <td>{element.item}</td>
                        <td>{element.order}</td>
                        <td>{element.type}</td>
                    </tr>)
                })
            }
            </tbody>
        </table>
    </div>
  )
}
