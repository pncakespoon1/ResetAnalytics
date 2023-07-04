import ReactTooltip from "react-tooltip"
import { tooltipTexts } from "../public/helpers/frontend"

export const MainStatsToolTips = () => (
  <>
    <ReactTooltip id="totals-tip">{tooltipTexts.totals}</ReactTooltip>
    <ReactTooltip id="avgs-tip">{tooltipTexts.avgs}</ReactTooltip>
    <ReactTooltip id="tsp-tip">{tooltipTexts.tsp}</ReactTooltip>
    <ReactTooltip id="conv-r-tip">{tooltipTexts.convR}</ReactTooltip>
    <ReactTooltip id="conv-g-tip">{tooltipTexts.convG}</ReactTooltip>
  </>
)

export const SplitInfoTooltips = () => (
  <>
    <ReactTooltip id="cumulative">Cumulative/Standard</ReactTooltip>
    <ReactTooltip id="relative">Relative to previous split</ReactTooltip>
  </>
)