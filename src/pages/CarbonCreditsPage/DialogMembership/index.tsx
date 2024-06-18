import { useEffect, useState } from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { IDialog, IMembership } from "../../../utils/interfaces";
import CustomDialogHeader from "../../../components/CustomDialogHeader";
import api from "../../../utils/api";
import CardMembership from "./CardMembership";

export default function DialogMembership({ opened, setOpened }: IDialog) {
  const [memberships, setMemberships] = useState<Array<IMembership>>([]);

  const handleOpen = () => setOpened((prev) => !prev);

  useEffect(() => {
    api
      .get("/membership")
      .then((res) => setMemberships(res.data))
      .catch(() => setMemberships([]));
  }, []);

  return (
    <Dialog open={opened} handler={handleOpen}>
      <CustomDialogHeader title="Memberships" handleDialog={handleOpen} />
      <DialogBody>
        {memberships.length ? (
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
            {memberships.map((membership) => (
              <CardMembership key={membership.id} data={membership} />
            ))}
          </div>
        ) : (
          <div className="h-56 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">No membership</span>
          </div>
        )}
      </DialogBody>
    </Dialog>
  );
}