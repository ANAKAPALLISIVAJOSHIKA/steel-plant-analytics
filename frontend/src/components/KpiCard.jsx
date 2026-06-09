function KpiCard({ title, value, bgColor, valueColor }) {

  return (

    <div style={{
      background:bgColor,

      borderRadius:"24px",

      padding:"25px",

      width:"240px",

      boxShadow:"0 4px 20px rgba(0,0,0,0.05)"
    }}>

      <h3 style={{
        color:"#374151",
        marginBottom:"15px",
        fontWeight:"600"
      }}>
        {title}
      </h3>

      <h1 style={{
        fontSize:"42px",
        color:valueColor
      }}>
        {value}
      </h1>

    </div>

  );
}

export default KpiCard;