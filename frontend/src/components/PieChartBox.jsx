import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = [
  "#f9a8d4",
  "#86efac",
  "#93c5fd",
  "#fde68a",
  "#c4b5fd"
];

function PieChartBox({ data }) {

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
        Department Delay Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={250}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={80}
            innerRadius={45}
            paddingAngle={5}
          >

            {data.map((entry,index)=>(

              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />

            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );
}

export default PieChartBox;