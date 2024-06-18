import React, { lazy, useState } from "react";
import Container from "../../components/Container";
import { LEARNS } from "../../utils/constants";

// -----------------------------------------------------------------------------

const PageTitle = lazy(() => import("../../components/PageTitle"));
const LearnItem = lazy(() => import("../LearnPage/LearnItem"));
const DialogMembership = lazy(() => import("./DialogMembership"));

// -----------------------------------------------------------------------------

export default function CarbonCreditsPage() {
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);

  const openDialog = () => {
    setDialogOpened(true);
  };

  return (
    <div>
      <PageTitle title="Carbon Credit" />
      <Container className="my-16 md:my-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LEARNS.map((dataItem) => (
            <div
              key={dataItem.id}
              className="cursor-pointer"
              onClick={openDialog}
            >
              <LearnItem data={dataItem} />
            </div>
          ))}
        </div>
      </Container>
      <DialogMembership opened={dialogOpened} setOpened={setDialogOpened} />
    </div>
  );
}