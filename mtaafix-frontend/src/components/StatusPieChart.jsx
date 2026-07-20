import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#3b82f6",
    "#f59e0b",
    "#22c55e",
    "#ef4444"
];

function StatusPieChart({ stats }) {

    const data = [

        {
            name: "Open",
            value: stats.openIssues
        },

        {
            name: "In Progress",
            value: stats.inProgressIssues
        },

        {
            name: "Resolved",
            value: stats.resolvedIssues
        },

        {
            name: "Rejected",
            value: stats.rejectedIssues
        }

    ];

    return (

        <div className="chart-card">

            <h3>Issue Status Distribution</h3>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        label
                    >

                        {
                            data.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />

                            ))
                        }

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default StatusPieChart;