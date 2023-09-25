import { fetcher } from '../public/helpers/frontend';
import useSWR from "swr"

const Sub10lb = () => {

    const { data, error } = useSWR(`/api/sub10lb`, fetcher);

    return (
    <div>
    <h1>Test</h1>
    </div>
    )
}

export default Sub10lb