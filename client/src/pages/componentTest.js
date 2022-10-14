import { useState, useEffect } from "react";
import TableRowStatic from "../components/table-row-static";
import TableHeader from "../components/table-header";
export default function ComponentTest() {
  const [addedMat, setAddMat] = useState([]);
  useEffect(() => {
    setAddMat([
      { mat: "1", uom: "2", qty: "3" },
      { mat: "1", uom: "2", qty: "3" },
      { mat: "1", uom: "2", qty: "3" },
    ]);
    console.log(addedMat);
  }, []);
  let matList = addedMat;
  return (
    <>
      <div className="typematerialList">
        <TableHeader
          heads={["Material", "UOM", "Qty"]}
          flexG={[{ flexGrow: 0.4 }, { flexGrow: 0 }, { flexGrow: 0 }]}
        />
        <div className="material-rows">
          {
            addedMat.map((mat, idx) => (
              //console.log(idx);
              <TableRowStatic
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
