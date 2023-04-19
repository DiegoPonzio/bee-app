import {ArcElement, BarElement, CategoryScale, Legend, LinearScale, Tooltip} from "chart.js";
import axios from "axios";
import Spinners from "../Spinners";
import {Bar} from "react-chartjs-2";
import {Chart} from "chart.js";
import  { useState, useEffect } from "react"

const ComentsPerPost = () => {
    Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            const result = await axios.get("/api/dashboard/commentsPerPost");
            setData(result.data.data);
            setLoading(true);
        } catch (error) {
            //console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={"flex pt-12 gap-3"}>
            {!loading ? <Spinners /> :
                <div className={"text-white rounded bg-gray-10 p-3"}>
                    <span className={"pb-4"}>Comunicados con mas comentarios</span>
                    <Bar data={data} />
                </div>
            }
        </div>
    )
}

export default ComentsPerPost;