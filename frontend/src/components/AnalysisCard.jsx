import { useNavigate } from "react-router-dom";

function AnalysisCard({
  title,
  description,
  route,
  icon,
  bgColor,
  iconBg
}) {

  const navigate = useNavigate();

  return (

    <div

      onClick={() => navigate(route)}

      style={{

        background:bgColor,

        borderRadius:"26px",

        padding:"28px",

        cursor:"pointer",

        transition:"0.3s",

        boxShadow:"0 4px 20px rgba(0,0,0,0.04)",

        minHeight:"250px",

        display:"flex",

        flexDirection:"column",

        justifyContent:"space-between"

      }}

      onMouseEnter={(e)=>{

        e.currentTarget.style.transform="translateY(-6px)";

      }}

      onMouseLeave={(e)=>{

        e.currentTarget.style.transform="translateY(0px)";

      }}

    >

      <div>

        <div style={{

          width:"72px",

          height:"72px",

          borderRadius:"50%",

          background:iconBg,

          display:"flex",

          justifyContent:"center",

          alignItems:"center",

          fontSize:"30px",

          marginBottom:"24px"

        }}>

          {icon}

        </div>

        <h2 style={{

          fontSize:"28px",

          marginBottom:"16px",

          color:"#111827"

        }}>
          {title}
        </h2>

        <p style={{

          color:"#4b5563",

          lineHeight:"1.8",

          fontSize:"16px"

        }}>
          {description}
        </p>

      </div>

      <p style={{

        marginTop:"25px",

        color:"#ec4899",

        fontWeight:"600",

        fontSize:"17px"

      }}>
        View Analysis →
      </p>

    </div>

  );
}

export default AnalysisCard;