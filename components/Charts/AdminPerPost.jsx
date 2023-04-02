import axios from "axios";
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Spinners from "../Spinners";

export default function AdminPerPost() {

    Chart.register(ArcElement, Tooltip, Legend);

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const myOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    const fetchData = async () => {
        try {
            const result = await axios.get("/api/dashboard/postPerAdmin");
            setData(result.data.data);
            setLoading(true);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex pt-12">
            {!loading ? <Spinners /> :
                <div className="text-white rounded bg-gray-10 p-3">
                    <span>No. de comunicados por administrador</span>
                    <Doughnut data={data} />
                </div>
            }
        </div>
    )
}