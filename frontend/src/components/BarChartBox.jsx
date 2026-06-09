import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

function BarChartBox({ title, data, color }) {

  return (

    <div style={{
      background:"#ffffff",
      borderRadius:"26px",
      padding:"24px",
      width:"100%",
      boxShadow:"0 4px 20px rgba(0,0,0,0.04)"
    }}>

      <h2 style={{
        marginBottom:"20px",
        fontSize:"22px",
        color:"#111827"
      }}>
        {title}
      </h2>

      <ResponsiveContainer
        width="100%"
        height={250}
      >

        <BarChart data={data}>

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="delays"
            fill={color}
            radius={[10,10,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );
}

export default BarChartBox;