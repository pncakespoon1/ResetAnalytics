import React from 'react'
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts'
import { colourList } from '../../../public/helpers/frontend'

const NetherTree = ({ netherTreeData }) => {
    const renderContent = ({ root, depth, x, y, width, height, index, payload, rank, name }) => {
        if (name == "No Structures") {
            var color = colourList[0]
        } else if (root.name == "Bastion First") {
            var color = colourList[1]
        } else if (root.name == "Fortress First") {
            var color = colourList[2]
        }

        console.log(name)
        console.log(root)
        console.log(depth)
        return (
            <g>
                <rect x={x} y={y} width={width} height={height} fill={color} />
                <text
                    x={x + width / 2}
                    y={y + height / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#000000"
                >
                    {name}
                </text>
            </g>
        )
    }


    return (
        <ResponsiveContainer width="100%" height={300}>
            <Treemap
                data={netherTreeData}
                nameKey="name"
                dataKey="value"
                ratio={4 / 3}
                stroke="#fff"
                fill={'#8889DD'}
                content={props => renderContent({ ...props })}
            >
                <Tooltip />
            </Treemap>
        </ResponsiveContainer>
    )
}

export default NetherTree