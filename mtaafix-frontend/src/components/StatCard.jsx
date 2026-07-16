function StatCard({title, value, onClick}) {

    return (

        <div 
            className="stat-card"
            onClick={onClick}
        >

            <h3>{title}</h3>

            <p>{value}</p>

        </div>

    );

}

export default StatCard;