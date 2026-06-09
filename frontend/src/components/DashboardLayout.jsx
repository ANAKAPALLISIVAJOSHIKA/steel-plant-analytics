import Sidebar from "./Sidebar";

import Topbar from "./Topbar";

function DashboardLayout({
  children,
  search,
  setSearch
}) {

  return (

    <div style={{

      display:"flex",

      background:"#f1f5f9",

      minHeight:"100vh"

    }}>

      <Sidebar />

      <div style={{

        flex:1,

        padding:"30px"

      }}>

        <Topbar
          search={search}
          setSearch={setSearch}
        />

        {children}

      </div>

    </div>

  );

}

export default DashboardLayout;