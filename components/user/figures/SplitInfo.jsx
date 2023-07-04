import { Table } from "react-bootstrap"
import { msToStr, roundToPerc } from "../../../public/helpers/frontendConverters"
import { SplitInfoTooltips } from "../../Tooltips"


const SplitInfo = ({ splitName, splitData }) => {
    return (
        <>
            <h1>Split Info for {splitName}</h1>
            <SplitInfoTooltips />
            <Table className="mb-4" style={{ fontSize: "1.35em" }} responsive bordered hover variant="light">
                <thead>
                    <tr>
                        <th>Count</th>
                        <th>Average</th>
                        <th>Stdev</th>
                        <th>Rate</th>
                        <th>XPH</th>
                    </tr>
                </thead>
                <tbody style={{ fontFamily: "Roboto", fontSize: "1em" }}>
                    <tr data-tip data-for="cumulative">
                        <td>{roundToPerc(splitData.total)}</td>
                        <td>{msToStr(splitData.time)}</td>
                        <td>{msToStr(splitData.cStdev)}</td>
                        <td>{roundToPerc(splitData.cConv) * 100}%</td>
                        <td>{roundToPerc(splitData.xph)}</td>
                    </tr>
                    <tr data-tip data-for="relative" style={{ color: "#888" }}>
                        <td></td>
                        <td>{msToStr(splitData.tsp)}</td>
                        <td>{msToStr(splitData.rStdev)}</td>
                        <td>{roundToPerc(splitData.rConv) * 100}%</td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default SplitInfo