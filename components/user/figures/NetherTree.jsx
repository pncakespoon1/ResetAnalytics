import React from 'react'
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts'

const NetherTree = ({ netherTreeData }) => {
    const renderContent = ({ root, depth, x, y, width, height, index, payload, colors, rank, name }) => {
        const color = colors[name]
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

    const colors = {
        "No Structures": "#ff0000",
        "Bast": "#00ff00",
        "Bast, Fort": "#00ff00",
        "Bast, Fort, Blind": "#00ff00",
        "Fort": "#0000ff",
        "Fort, Bast": "#0000ff",
        "Fort, Bast, Blind": "#0000ff"
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
                content={props => renderContent({ ...props, colors })}
            >
                <Tooltip />
            </Treemap>
        </ResponsiveContainer>
    )
}

export default NetherTree