import { useState, useEffect } from "react";
import TableRowStatic from "../components/table-row-static";
import TableHeader from "../components/table-header";
import TableRow from "../components/table-row";
export default function ComponentTest() {
  const [materialList, setMaterialList] = useState([]);
  useEffect(() => {});
  return (
    <>
      <div className="typematerialList">
        <TableHeader
          heads={["Material", "UOM", "Qty"]}
          flexG={[{ flexGrow: 0.4 }, { flexGrow: 0 }, { flexGrow: 0 }]}
        />
        <div className="material-rows">
          {
            materialList.map((mat, idx) => (
              //console.log(idx);
              <TableRow
                matName={mat.mat}
                uom={mat.uom}
                qty={mat.qty}
                id={idx}
              />
            ))
            //<TableRowStatic matName={m.mat} uom={m.uom} qty={m.qty} />
          }
        </div>
      </div>
    </>
  );
}
