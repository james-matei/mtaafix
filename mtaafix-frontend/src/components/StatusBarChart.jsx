import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function StatusBarChart({ stats }) {

    const data = [

        {
            status: "Open",
            issues: stats.openIssues
        },

        {
            status: "In Progress",
            issues: stats.inProgressIssues
        },

        {
            status: "Resolved",
            issues: stats.resolvedIssues
        },

        {
            status: "Rejected",
            issues: stats.rejectedIssues
        }

    ];

    return (

        <div className="chart-card">

            <h3>Issues by Status</h3>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="status" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="issues"
                        fill="#2563eb"
                        radius={[6, 6, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default StatusBarChart;