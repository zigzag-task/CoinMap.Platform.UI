import { useSelector } from "react-redux";
import Table from "../../../shared/table";

function WorkSpaceVenueList() {
  const venues = useSelector((store: any) => store["VENUE"].venues);

  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        {venues.length > 0 && <Table rows={venues} />}
      </div>
    </div>
  );
}

export default WorkSpaceVenueList;
